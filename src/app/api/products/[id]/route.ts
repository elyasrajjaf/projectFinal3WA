import { NextResponse } from "next/server";
import Product from "@/models/products";
import { connectDB } from "@/libs/mongodb";

// Get by id
export const GET = async (req: Request, res: NextResponse) => {
  const id = req.url.split("/products/")[1];

  try {
    await connectDB();
    const product = await Product.findById(id).populate("categoryId");
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Pdt not" }, { status: 400 });
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  const id = req.url.split("/products/")[1];

  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Pdt not de" }, { status: 400 });
  }
};

// Edit by id
export const PUT = async (req: Request, res: NextResponse) => {
  const id = req.url.split("/products/")[1];
  const { name, description, price } = await req.json();

  try {
    await connectDB();
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Pdt not updated" }, { status: 400 });
  }
};
