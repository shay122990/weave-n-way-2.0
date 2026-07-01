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
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

// GET all fabrics
export async function GET() {
  const { data, error } = await supabase
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
    const body = await req.json();

    const { data, error } = await supabase
      .from("fabrics")
      .insert({
        name: body.name || "",
        title: body.title || "",
        category: body.category || "",
        description: body.description || "",
        image: body.image || "",
        color: body.color || "",
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
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 },
    );
  }
}
