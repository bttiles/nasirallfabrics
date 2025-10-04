import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description?: string;
  img: string;
  isActive: boolean;
  productCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      required: [true, "Category image is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    productCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Important: explicitly define the model type
const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
