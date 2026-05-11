import { fabrics } from "@/lib/data/fabrics/fabrics";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json();

  const index = fabrics.findIndex((f) => f._id === id);

  if (index === -1) {
    return new Response("Not found", { status: 404 });
  }

  fabrics[index] = {
    ...fabrics[index],
    ...body,
    _id: id,
  };

  return Response.json(fabrics[index]);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const index = fabrics.findIndex((f) => f._id === id);

  if (index === -1) {
    return new Response("Not found", { status: 404 });
  }

  fabrics.splice(index, 1);

  return new Response("Deleted", { status: 200 });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const fabric = fabrics.find((f) => f._id === id);

  if (!fabric) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(fabric);
}
