import { NextResponse } from "next/server";
import User from "@/models/user";
import Category from "@/models/category";
import { connectDB } from "@/libs/mongodb";
import { getServerSession } from "next-auth";

export async function GET() {
  // Vérifiez si l'user est connecté
  const session = await getServerSession();

  if (!session) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  const { user } = session;

  try {
    await connectDB();

    // Vérifiez si l'user existe
    const userFound = await User.findOne({ email: user?.email });

    if (!userFound) {
      return NextResponse.redirect("http://localhost:3000/login");
    }

    const categories = await Category.find({ userId: userFound._id });

    return NextResponse.json(categories, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}

export async function POST(request: Request) {
  const { name } = await request.json();

  // Vérifiez si l'user est connecté
  const session = await getServerSession();

  if (!session) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  const { user } = session;

  try {
    await connectDB();

    // Vérifiez si l'user existe
    const userFound = await User.findOne({ email: user?.email });

    if (!userFound) {
      return NextResponse.redirect("http://localhost:3000/login");
    }

    const newCategory = new Category({
      name,
      userId: userFound._id,
    });
    const savedCategory = await newCategory.save();

    return NextResponse.json(savedCategory, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
