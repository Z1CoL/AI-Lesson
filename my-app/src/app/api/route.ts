import { NextRequest, NextResponse } from "next/server";
import connectDB from "../lib/utils/mongodb";
import User from "../lib/models/models";
import { InferenceClient } from "@huggingface/inference";

export async function GET() {
  await connectDB();

  const allUsers = await User.find();

  console.log();

  return NextResponse.json({ data: allUsers });
}

export async function POST(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  const { name } = body;

  const NewUser = new User({ name });
  await NewUser.save();

  console.log(body.data);

  return NextResponse.json({
    message: " Amjilttai data update hiile. ",
    data: NewUser,
  });
}
