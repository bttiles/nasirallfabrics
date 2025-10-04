import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

// Import existing data
import shopData from '@/components/Shop/shopData';
import categoryData from '@/components/Home/Categories/categoryData';

async function migrateData() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Migrate categories with duplicate handling
    const categories = [];
    for (const categoryDataItem of categoryData) {
      try {
        const category = new Category(categoryDataItem);
        await category.save();
        categories.push(category);
        console.log(`✅ Migrated category: ${categoryDataItem.title}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️  Category already exists: ${categoryDataItem.title}`);
        } else {
          throw error;
        }
      }
    }
    console.log(`Migrated ${categories.length} categories`);

    // Migrate products
    const products = await Product.insertMany(shopData);
    console.log(`Migrated ${products.length} products`);

    console.log('Data migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData();
}

export default migrateData;
