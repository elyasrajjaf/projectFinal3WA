import { Schema, model, models, Types } from "mongoose";

const { ObjectId } = Types;

const productSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: ObjectId,
      ref: "Category",
    }
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", productSchema);
export default Product;
