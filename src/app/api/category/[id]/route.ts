import { NextResponse } from "next/server";
import Category from "@/models/category";
import { connectDB } from "@/libs/mongodb";

export const DELETE = async (req: Request, res: NextResponse) => {
  const id = req.url.split("/category/")[1];

  try {
    await connectDB();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Category deleted" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Not Found" }, { status: 400 });
  }
};
