import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { password } = await req.json();

  console.log("Typed password:", password);
  console.log("ENV password exists:", !!process.env.ADMIN_PASSWORD);
  console.log("JWT secret exists:", !!process.env.JWT_SECRET);
  console.log("Passwords match:", password === process.env.ADMIN_PASSWORD);

  if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return NextResponse.json(
      { message: "Missing env variables" },
      { status: 500 },
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  return response;
}
