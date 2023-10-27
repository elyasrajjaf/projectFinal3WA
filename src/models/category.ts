import { Schema, model, models, Types } from "mongoose";

const { ObjectId } = Types;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Category = models.Category || model("Category", categorySchema);
export default Category;