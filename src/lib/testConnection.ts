import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config(); // Load .env.local variables

export async function testConnection() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("❌ Missing MONGODB_URI in environment variables");
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB Atlas!");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("📊 Available collections:", collections.map((c) => c.name));

    await mongoose.disconnect();
    console.log("✅ Connection test completed successfully!");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

// Run test when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection().then((success) => process.exit(success ? 0 : 1));
}
