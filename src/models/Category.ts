import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description?: string;
  img?: string;
  isActive: boolean;
  productCount?: number;
  collectionId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    productCount: {
      type: Number,
      default: 0,
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: [true, "Collection reference is required"],
    },
  },
  { timestamps: true }
);

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
