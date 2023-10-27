import { NextResponse } from "next/server";
import User from "@/models/user";
import Product from "@/models/products";
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

    // Récupérez tous les produits de l'user
    const products = await Product.find({ userId: userFound._id });

    return NextResponse.json(products, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}

export async function POST(request: Request) {
  const { name, description, price, category, stock } = await request.json();

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

    // Créez un nouveau produit
    const newProduct = new Product({
      userId: userFound._id,
      name,
      categoryId: category,
      description,
      stock,
      price,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
