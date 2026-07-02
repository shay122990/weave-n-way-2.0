// import { fabrics } from "@/lib/data/fabrics/fabrics";
// import { NextRequest } from "next/server";

// export async function PUT(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await context.params;
//   const body = await request.json();

//   const index = fabrics.findIndex((f) => f._id === id);

//   if (index === -1) {
//     return new Response("Not found", { status: 404 });
//   }

//   fabrics[index] = {
//     ...fabrics[index],
//     ...body,
//     _id: id,
//   };

//   return Response.json(fabrics[index]);
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await context.params;

//   const index = fabrics.findIndex((f) => f._id === id);

//   if (index === -1) {
//     return new Response("Not found", { status: 404 });
//   }

//   fabrics.splice(index, 1);

//   return new Response("Deleted", { status: 200 });
// }

// export async function GET(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await context.params;

//   const fabric = fabrics.find((f) => f._id === id);

//   if (!fabric) {
//     return new Response("Not found", { status: 404 });
//   }

//   return Response.json(fabric);
// }

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// GET one fabric
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const { data, error } = await supabaseAdmin
    .from("fabrics")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}

// UPDATE fabric
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim() ?? "";
    const title = formData.get("title")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "";
    const description = formData.get("description")?.toString().trim() ?? "";
    const color = formData.get("color")?.toString().trim() ?? "";

    if (!name || !title || !category || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 },
      );
    }

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("fabrics")
      .select("image")
      .eq("id", id)
      .single();

    if (existingError) {
      return NextResponse.json(
        {
          success: false,
          message: existingError.message,
        },
        { status: 404 },
      );
    }

    let image = existing.image;

    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("fabric-images")
        .upload(fileName, file);

      if (uploadError) {
        return NextResponse.json(
          {
            success: false,
            message: uploadError.message,
          },
          { status: 500 },
        );
      }

      image = supabaseAdmin.storage.from("fabric-images").getPublicUrl(fileName)
        .data.publicUrl;
    }

    const { data, error } = await supabaseAdmin
      .from("fabrics")
      .update({
        name,
        title,
        category,
        description,
        color,
        image,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 },
      );
    }

    // Delete old image only after successful update
    if (file instanceof File && file.size > 0 && existing.image) {
      const oldPath = existing.image.split("/fabric-images/")[1];

      if (oldPath) {
        await supabaseAdmin.storage.from("fabric-images").remove([oldPath]);
      }
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update fabric",
      },
      { status: 500 },
    );
  }
}

// DELETE fabric
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    // Get current image URL
    const { data: fabric, error: fetchError } = await supabaseAdmin
      .from("fabrics")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        {
          success: false,
          message: fetchError.message,
        },
        { status: 404 },
      );
    }

    // Delete database row
    const { error: deleteError } = await supabaseAdmin
      .from("fabrics")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        {
          success: false,
          message: deleteError.message,
        },
        { status: 500 },
      );
    }

    // Delete image from Storage
    if (fabric.image) {
      const path = fabric.image.split("/fabric-images/")[1];

      if (path) {
        await supabaseAdmin.storage.from("fabric-images").remove([path]);
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete fabric",
      },
      { status: 500 },
    );
  }
}
