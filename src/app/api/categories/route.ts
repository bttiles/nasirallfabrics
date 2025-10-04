import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

// GET /api/categories - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const categories = await Category.find({ isActive: true })
      .sort({ title: 1 });
    
    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const category = new Category(body);
    await category.save();
    
    return NextResponse.json({
      success: true,
      data: category,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
