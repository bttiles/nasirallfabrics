import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  discountedPrice: number;
  description?: string;
  categoryId: mongoose.Types.ObjectId;
  brand?: string;
  inStock?: boolean;
  imgs: {
    thumbnails: string[];
    previews: string[];
  };
  reviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountedPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    description: String,
    brand: String,
    inStock: {
      type: Boolean,
      default: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    imgs: {
      thumbnails: { type: [String], default: [] },
      previews: { type: [String], default: [] },
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category reference is required"],
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
