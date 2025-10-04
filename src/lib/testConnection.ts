import mongoose from 'mongoose';

// Test database connection
export async function testConnection() {
  const MONGODB_URI = 'mongodb+srv://syedmuhibfarooq_db_user:wgxmUoiudHu0HpUN@cluster0.xsrz42d.mongodb.net/nextmerce?retryWrites=true&w=majority&appName=Cluster0';
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test database operations
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testConnection().then(success => {
    process.exit(success ? 0 : 1);
  });
}

