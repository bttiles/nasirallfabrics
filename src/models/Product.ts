import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  description?: string;
  category?: string;
  brand?: string;
  inStock?: boolean;
  imgs: {
    thumbnails: string[];
    previews: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0,
  },
  discountedPrice: {
    type: Number,
    required: [true, 'Discounted price is required'],
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  imgs: {
    thumbnails: [String],
    previews: [String],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
