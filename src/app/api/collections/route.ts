import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Collection from "@/models/Collection";

// ✅ GET /api/collections — Fetch all collections
export async function GET() {
  try {
    await connectDB();

    const collections = await Collection.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: collections,
    });
  } catch (error) {
    console.error("❌ Error fetching collections:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

// ✅ POST /api/collections — Create a new collection
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Collection name is required" },
        { status: 400 }
      );
    }

    if (!body.season || !['summer', 'winter'].includes(body.season)) {
      return NextResponse.json(
        { success: false, error: "Season must be either 'summer' or 'winter'" },
        { status: 400 }
      );
    }

    const newCollection = await Collection.create(body);

    return NextResponse.json(
      { success: true, data: newCollection },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating collection:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Collection name already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to create collection" },
      { status: 500 }
    );
  }
}

// ✅ PUT /api/collections?id=<collectionId> — Update a collection
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Collection ID is required" },
        { status: 400 }
      );
    }

    if (body.season && !['summer', 'winter'].includes(body.season)) {
      return NextResponse.json(
        { success: false, error: "Season must be either 'summer' or 'winter'" },
        { status: 400 }
      );
    }

    const updatedCollection = await Collection.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedCollection) {
      return NextResponse.json(
        { success: false, error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCollection });
  } catch (error: any) {
    console.error("❌ Error updating collection:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Collection name already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to update collection" },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/collections?id=<collectionId> — Delete a collection
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Collection ID is required" },
        { status: 400 }
      );
    }

    const deletedCollection = await Collection.findByIdAndDelete(id);

    if (!deletedCollection) {
      return NextResponse.json(
        { success: false, error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedCollection });
  } catch (error) {
    console.error("❌ Error deleting collection:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete collection" },
      { status: 500 }
    );
  }
}
