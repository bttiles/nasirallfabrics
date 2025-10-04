import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  description?: string;
  img: string;
  isActive: boolean;
  productCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Category title is required'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    required: [true, 'Category image is required'],
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
}, {
  timestamps: true,
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
