import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { fullName, email, password } = await request.json();

  // Check if password exists and is at least 6 characters long
  if (!password || password.length < 6)
    return NextResponse.json(
      { error: "Password must be at least 6 characters long" },
      { status: 400 }
    );

  try {
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound) return NextResponse.json({ error: "Email is already taken" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ fullName, email, password: hashedPassword });

    const savedUser = await user.save();

    return NextResponse.json(savedUser, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
