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

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

// GET one fabric
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const { data, error } = await supabase
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
  const { id } = await context.params;
  const body = await request.json();

  const { data, error } = await supabase
    .from("fabrics")
    .update({
      name: body.name,
      title: body.title,
      category: body.category,
      description: body.description,
      image: body.image,
      color: body.color,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}

// DELETE fabric
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const { error } = await supabase.from("fabrics").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
