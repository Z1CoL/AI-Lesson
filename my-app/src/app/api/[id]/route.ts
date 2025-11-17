import { NextResponse } from "next/server";
import connectDB from "../../lib/utils/mongodb";
import User from "../../lib/models/models";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  const { name, age } = body;

  await connectDB();

  const updatedUser = await User.findByIdAndUpdate(id, { name, age });

  return NextResponse.json({ data: updatedUser });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  await connectDB();

  const deletedUser = await User.findByIdAndDelete(id);

  return NextResponse.json({ message: "amjilttai hereglegch ustgagdla" });
}
