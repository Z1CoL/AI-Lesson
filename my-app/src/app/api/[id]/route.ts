import { NextResponse } from "next/server";
import connectDB from "../../lib/utils/mongodb";
import User from "../../lib/models/models";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params; // ✅ энд

  const body = (await request.json()) as { name?: string; age?: number };
  const { name, age } = body;

  await connectDB();

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, age },
    { new: true }, // ✅ update хийгдсэний дараах утгыг буцаана
  );

  return NextResponse.json({ data: updatedUser });
}

export async function DELETE(request: Request, { params }: Ctx) {
  const { id } = await params; // ✅ энд

  await connectDB();

  await User.findByIdAndDelete(id);

  return NextResponse.json({ message: "amjilttai hereglegch ustgagdla" });
}
