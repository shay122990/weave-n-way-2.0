import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fabrics } from "@/lib/data/fabrics/fabrics";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

export async function GET() {
  const data = fabrics.map(({ _id, ...fabric }) => fabric);

  const { data: inserted, error } = await supabase
    .from("fabrics")
    .insert(data)
    .select();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    inserted: inserted?.length ?? 0,
  });
}
