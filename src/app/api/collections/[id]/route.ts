import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Collection from "@/models/Collection";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();

    if (body.season && !['summer', 'winter'].includes(body.season)) {
      return NextResponse.json(
        { success: false, error: "Season must be either 'summer' or 'winter'" },
        { status: 400 }
      );
    }

    const updated = await Collection.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Error updating collection:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Collection name already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: false, error: "Failed to update collection" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const deleted = await Collection.findByIdAndDelete(params.id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Collection not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json({ success: false, error: "Failed to delete collection" }, { status: 500 });
  }
}
