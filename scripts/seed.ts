import 'dotenv/config';
import connectDB from "@/lib/mongodb";
import Collection from "@/models/Collection";
import Category from "@/models/Category";
import Product from "@/models/Product";

const seedData = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await Collection.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️ Cleared existing collections, categories, and products");

    // Create Summer Collection
    const summerCollection = await Collection.create({
      name: "Summer Collection",
      description: "Light and breathable fabrics perfect for summer season",
      season: "summer",
      isActive: true,
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop"
    });
    console.log("✅ Created Summer Collection");

    // Create Winter Collection
    const winterCollection = await Collection.create({
      name: "Winter Collection",
      description: "Warm and cozy fabrics ideal for winter season",
      season: "winter",
      isActive: true,
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop"
    });
    console.log("✅ Created Winter Collection");

    // Summer Collection Categories
    const summerCategories = [
      {
        title: "Chicken Kaari Designs",
        description: "Intricate chicken kaari embroidery work on lightweight fabrics",
        collectionId: summerCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      },
      {
        title: "Cutwork Chickan Designs",
        description: "Beautiful cutwork chickan patterns perfect for summer wear",
        collectionId: summerCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      },
      {
        title: "Qureshia Chicken Designs",
        description: "Traditional Qureshia chicken embroidery with modern touch",
        collectionId: summerCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      },
      {
        title: "Summer Cotton Embroidery",
        description: "Light cotton fabrics with delicate embroidery work",
        collectionId: summerCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      },
      {
        title: "Chiffon Chicken Work",
        description: "Elegant chiffon fabrics with chicken work embroidery",
        collectionId: summerCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      }
    ];

    // Winter Collection Categories
    const winterCategories = [
      {
        title: "Velvet Doria Chickan",
        description: "Luxurious velvet fabrics with doria chickan embroidery",
        collectionId: winterCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      },
      {
        title: "Irish Karandi Embroidery",
        description: "Traditional Irish karandi embroidery on winter fabrics",
        collectionId: winterCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      },
      {
        title: "Winter Silk Chicken Work",
        description: "Premium silk fabrics with intricate chicken work",
        collectionId: winterCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      },
      {
        title: "Woolen Embroidery",
        description: "Warm woolen fabrics with traditional embroidery patterns",
        collectionId: winterCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      },
      {
        title: "Cashmere Chicken Work",
        description: "Luxurious cashmere fabrics with delicate chicken work",
        collectionId: winterCollection._id,
        isActive: true,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
      }
    ];

    // Create all categories
    const allCategories = [...summerCategories, ...winterCategories];
    const createdCategories = await Category.insertMany(allCategories);
    console.log(`✅ Created ${allCategories.length} categories`);

    // Create products for each category
    const products = [];

    // Summer Collection Products
    const summerProducts = [
      // Chicken Kaari Designs
      {
        title: "Premium Cotton Chicken Kaari Kurta",
        price: 2500,
        discountedPrice: 1999,
        description: "Elegant cotton kurta with intricate chicken kaari embroidery. Perfect for summer occasions.",
        categoryId: createdCategories[0]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 15,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Chicken Kaari Lawn Shirt",
        price: 1800,
        discountedPrice: 1499,
        description: "Lightweight lawn shirt with beautiful chicken kaari work. Ideal for casual summer wear.",
        categoryId: createdCategories[0]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 8,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Designer Chicken Kaari Dupatta",
        price: 1200,
        discountedPrice: 999,
        description: "Exquisite dupatta with detailed chicken kaari embroidery. Perfect accessory for summer outfits.",
        categoryId: createdCategories[0]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 12,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },

      // Cutwork Chickan Designs
      {
        title: "Cutwork Chickan Cotton Dress",
        price: 3200,
        discountedPrice: 2599,
        description: "Beautiful cotton dress with intricate cutwork chickan patterns. Perfect for summer parties.",
        categoryId: createdCategories[1]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 20,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Cutwork Chickan Lawn Suit",
        price: 4500,
        discountedPrice: 3799,
        description: "Complete lawn suit with stunning cutwork chickan embroidery. Ideal for special occasions.",
        categoryId: createdCategories[1]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 18,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Cutwork Chickan Scarf",
        price: 800,
        discountedPrice: 699,
        description: "Delicate scarf with cutwork chickan patterns. Lightweight and breathable for summer.",
        categoryId: createdCategories[1]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 6,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },

      // Qureshia Chicken Designs
      {
        title: "Qureshia Chicken Work Kurta",
        price: 2800,
        discountedPrice: 2299,
        description: "Traditional Qureshia chicken work kurta with modern styling. Perfect for cultural events.",
        categoryId: createdCategories[2]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 14,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Qureshia Chicken Embroidered Shirt",
        price: 2100,
        discountedPrice: 1799,
        description: "Elegant shirt featuring traditional Qureshia chicken embroidery. Comfortable for daily wear.",
        categoryId: createdCategories[2]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 9,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },

      // Summer Cotton Embroidery
      {
        title: "Cotton Embroidered Summer Dress",
        price: 2200,
        discountedPrice: 1899,
        description: "Light cotton dress with delicate embroidery work. Perfect for hot summer days.",
        categoryId: createdCategories[3]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 16,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Cotton Embroidered Tunic",
        price: 1900,
        discountedPrice: 1599,
        description: "Comfortable cotton tunic with beautiful embroidery. Ideal for casual summer outfits.",
        categoryId: createdCategories[3]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 11,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },

      // Chiffon Chicken Work
      {
        title: "Chiffon Chicken Work Saree",
        price: 3500,
        discountedPrice: 2999,
        description: "Elegant chiffon saree with intricate chicken work embroidery. Perfect for special occasions.",
        categoryId: createdCategories[4]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 22,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Chiffon Chicken Work Blouse",
        price: 1500,
        discountedPrice: 1299,
        description: "Beautiful chiffon blouse with chicken work embroidery. Lightweight and elegant.",
        categoryId: createdCategories[4]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 7,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      }
    ];

    // Winter Collection Products
    const winterProducts = [
      // Velvet Doria Chickan
      {
        title: "Velvet Doria Chickan Jacket",
        price: 5500,
        discountedPrice: 4599,
        description: "Luxurious velvet jacket with doria chickan embroidery. Perfect for winter elegance.",
        categoryId: createdCategories[5]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 25,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Velvet Doria Chickan Coat",
        price: 6800,
        discountedPrice: 5799,
        description: "Premium velvet coat with intricate doria chickan work. Ideal for formal winter events.",
        categoryId: createdCategories[5]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 18,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Velvet Doria Chickan Shawl",
        price: 3200,
        discountedPrice: 2699,
        description: "Warm velvet shawl with beautiful doria chickan embroidery. Perfect winter accessory.",
        categoryId: createdCategories[5]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 12,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },

      // Irish Karandi Embroidery
      {
        title: "Irish Karandi Embroidered Sweater",
        price: 4200,
        discountedPrice: 3599,
        description: "Warm sweater with traditional Irish karandi embroidery. Perfect for cold winter days.",
        categoryId: createdCategories[6]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 19,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Irish Karandi Woolen Cardigan",
        price: 3800,
        discountedPrice: 3299,
        description: "Cozy woolen cardigan with Irish karandi embroidery. Ideal for layering in winter.",
        categoryId: createdCategories[6]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 15,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },

      // Winter Silk Chicken Work
      {
        title: "Silk Chicken Work Evening Gown",
        price: 7500,
        discountedPrice: 6499,
        description: "Elegant silk evening gown with intricate chicken work. Perfect for winter formal events.",
        categoryId: createdCategories[7]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 28,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Silk Chicken Work Blazer",
        price: 5200,
        discountedPrice: 4499,
        description: "Sophisticated silk blazer with chicken work embroidery. Ideal for professional winter wear.",
        categoryId: createdCategories[7]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 21,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },

      // Woolen Embroidery
      {
        title: "Woolen Embroidered Pullover",
        price: 2900,
        discountedPrice: 2499,
        description: "Warm woolen pullover with traditional embroidery patterns. Perfect for winter comfort.",
        categoryId: createdCategories[8]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 17,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Woolen Embroidered Vest",
        price: 2200,
        discountedPrice: 1899,
        description: "Stylish woolen vest with beautiful embroidery work. Great for layering in winter.",
        categoryId: createdCategories[8]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 13,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },

      // Cashmere Chicken Work
      {
        title: "Cashmere Chicken Work Scarf",
        price: 4500,
        discountedPrice: 3899,
        description: "Luxurious cashmere scarf with delicate chicken work. Ultimate winter luxury accessory.",
        categoryId: createdCategories[9]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 24,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      },
      {
        title: "Cashmere Chicken Work Wrap",
        price: 6200,
        discountedPrice: 5399,
        description: "Elegant cashmere wrap with intricate chicken work embroidery. Perfect for special winter occasions.",
        categoryId: createdCategories[9]._id,
        brand: "Nasir Fabrics",
        inStock: true,
        reviews: 16,
        imgs: {
          thumbnails: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"],
          previews: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop"]
        }
      }
    ];

    // Create all products
    const allProducts = [...summerProducts, ...winterProducts];
    await Product.insertMany(allProducts);
    console.log(`✅ Created ${allProducts.length} products`);

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`- Collections: 2 (Summer, Winter)`);
    console.log(`- Summer Categories: ${summerCategories.length}`);
    console.log(`- Winter Categories: ${winterCategories.length}`);
    console.log(`- Total Categories: ${allCategories.length}`);
    console.log(`- Summer Products: ${summerProducts.length}`);
    console.log(`- Winter Products: ${winterProducts.length}`);
    console.log(`- Total Products: ${allProducts.length}`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
};

// Run the seed function
seedData()
  .then(() => {
    console.log("✅ Seeding process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding process failed:", error);
    process.exit(1);
  });
