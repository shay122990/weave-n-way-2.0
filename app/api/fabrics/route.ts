// KEEPING THIS, IN CASE OF REGIONAL RESTRICTIONS

// import { fabrics } from "@/lib/data/fabrics/fabrics";
// import { NextResponse } from "next/server";

// // GET all fabrics
// export async function GET() {
//   return NextResponse.json({
//     success: true,
//     data: fabrics,
//   });
// }

// // CREATE fabric
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const newFabric = {
//       _id: crypto.randomUUID(),
//       name: body.name || "",
//       title: body.title || "",
//       category: body.category || "",
//       description: body.description || "",
//       image: body.image || "",
//       color: body.color || "",
//     };

//     fabrics.push(newFabric);

//     return NextResponse.json(
//       { success: true, data: newFabric },
//       { status: 201 },
//     );
//   } catch {
//     return NextResponse.json(
//       { success: false, message: "Invalid request body" },
//       { status: 400 },
//     );
//   }
// }

// // DELETE ALL fabrics
// export async function DELETE() {
//   fabrics.length = 0;

//   return NextResponse.json({
//     success: true,
//     message: "All fabrics deleted",
//   });
// }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// GET all fabrics
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("fabrics")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}

// CREATE fabric
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() ?? "";
    const title = formData.get("title")?.toString() ?? "";
    const category = formData.get("category")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";
    const color = formData.get("color")?.toString() ?? "";

    if (!name || !title || !category || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 },
      );
    }

    let image = "";

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
      .insert({
        name,
        title,
        category,
        description,
        color,
        image,
      })
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

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create fabric",
      },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  try {
    // Get all image URLs
    const { data: fabrics, error: fetchError } = await supabaseAdmin
      .from("fabrics")
      .select("image");

    if (fetchError) {
      return NextResponse.json(
        {
          success: false,
          message: fetchError.message,
        },
        { status: 500 },
      );
    }

    // Convert URLs into storage paths
    const paths =
      fabrics
        ?.map((fabric) => {
          if (!fabric.image) return null;
          return fabric.image.split("/fabric-images/")[1];
        })
        .filter(Boolean) ?? [];

    // Delete all images from Storage
    if (paths.length > 0) {
      const { error: storageError } = await supabaseAdmin.storage
        .from("fabric-images")
        .remove(paths);

      if (storageError) {
        return NextResponse.json(
          {
            success: false,
            message: storageError.message,
          },
          { status: 500 },
        );
      }
    }

    // Delete all database rows
    const { error: deleteError } = await supabaseAdmin
      .from("fabrics")
      .delete()
      .neq("id", "");

    if (deleteError) {
      return NextResponse.json(
        {
          success: false,
          message: deleteError.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "All fabrics deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete fabrics",
      },
      { status: 500 },
    );
  }
}
