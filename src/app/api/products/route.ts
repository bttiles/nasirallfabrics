import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/products - Fetch all products
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');
    
    let query = {};
    if (category) {
      query = { category: category };
    }
    
    const limitNum = limit ? parseInt(limit) : 10;
    const pageNum = page ? parseInt(page) : 1;
    const skip = (pageNum - 1) * limitNum;
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);
    
    const total = await Product.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const payload = {
      ...body,
      imgs: body.imgs ?? {
        thumbnails: Array.isArray(body.thumbnails) ? body.thumbnails : [],
        previews: Array.isArray(body.previews) ? body.previews : [],
      },
    } as any;
    delete payload.thumbnails;
    delete payload.previews;

    const product = new Product(payload);
    await product.save();
    
    return NextResponse.json({
      success: true,
      data: product,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
