# Database Seeding Guide

This guide explains how to seed your database with initial collections and categories for the fabric ecommerce site.

## Overview

The seed script creates:
- **2 Main Collections**: Summer Collection and Winter Collection
- **10 Categories**: 5 for Summer Collection and 5 for Winter Collection
- **22 Products**: 12 Summer products and 10 Winter products across all categories

## Summer Collection Categories

1. **Chicken Kaari Designs** - Intricate chicken kaari embroidery work on lightweight fabrics
2. **Cutwork Chickan Designs** - Beautiful cutwork chickan patterns perfect for summer wear
3. **Qureshia Chicken Designs** - Traditional Qureshia chicken embroidery with modern touch
4. **Summer Cotton Embroidery** - Light cotton fabrics with delicate embroidery work
5. **Chiffon Chicken Work** - Elegant chiffon fabrics with chicken work embroidery

## Winter Collection Categories

1. **Velvet Doria Chickan** - Luxurious velvet fabrics with doria chickan embroidery
2. **Irish Karandi Embroidery** - Traditional Irish karandi embroidery on winter fabrics
3. **Winter Silk Chicken Work** - Premium silk fabrics with intricate chicken work
4. **Woolen Embroidery** - Warm woolen fabrics with traditional embroidery patterns
5. **Cashmere Chicken Work** - Luxurious cashmere fabrics with delicate chicken work

## Sample Products Created

### Summer Collection Products (12 products)
- **Chicken Kaari Designs**: Premium Cotton Chicken Kaari Kurta, Chicken Kaari Lawn Shirt, Designer Chicken Kaari Dupatta
- **Cutwork Chickan Designs**: Cutwork Chickan Cotton Dress, Cutwork Chickan Lawn Suit, Cutwork Chickan Scarf
- **Qureshia Chicken Designs**: Qureshia Chicken Work Kurta, Qureshia Chicken Embroidered Shirt
- **Summer Cotton Embroidery**: Cotton Embroidered Summer Dress, Cotton Embroidered Tunic
- **Chiffon Chicken Work**: Chiffon Chicken Work Saree, Chiffon Chicken Work Blouse

### Winter Collection Products (10 products)
- **Velvet Doria Chickan**: Velvet Doria Chickan Jacket, Velvet Doria Chickan Coat, Velvet Doria Chickan Shawl
- **Irish Karandi Embroidery**: Irish Karandi Embroidered Sweater, Irish Karandi Woolen Cardigan
- **Winter Silk Chicken Work**: Silk Chicken Work Evening Gown, Silk Chicken Work Blazer
- **Woolen Embroidery**: Woolen Embroidered Pullover, Woolen Embroidered Vest
- **Cashmere Chicken Work**: Cashmere Chicken Work Scarf, Cashmere Chicken Work Wrap

## How to Run the Seed Script

### Prerequisites

1. Make sure your MongoDB database is running
2. Create a `.env.local` file with your MongoDB connection string:
   ```bash
   # Create .env.local file
   echo "MONGODB_URI=mongodb://localhost:27017/fabric-ecommerce" > .env.local
   
   # Or for MongoDB Atlas:
   echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fabric-ecommerce?retryWrites=true&w=majority" > .env.local
   ```
3. Install dependencies: `npm install`

### Running the Seed Script

```bash
npm run seed
```

This will:
- Clear existing collections and categories
- Create the Summer and Winter collections
- Create all 10 categories linked to their respective collections
- Display a summary of what was created

### Expected Output

```
🌱 Starting database seeding...
🗑️ Cleared existing collections, categories, and products
✅ Created Summer Collection
✅ Created Winter Collection
✅ Created 10 categories
✅ Created 22 products
🎉 Database seeding completed successfully!

📊 Summary:
- Collections: 2 (Summer, Winter)
- Summer Categories: 5
- Winter Categories: 5
- Total Categories: 10
- Summer Products: 12
- Winter Products: 10
- Total Products: 22
```

## Admin Panel Usage

After seeding, you can:

1. **View Collections**: Go to `/admin` and click on the "Collections" tab
2. **View Categories**: Click on the "Categories" tab to see all categories
3. **View Products**: Click on the "Products" tab to see all products
4. **Add New Collections**: Use the admin form to add more collections
5. **Add New Categories**: Select a collection and add categories
6. **Add New Products**: Select a category and add products
7. **Edit/Delete**: Use the edit and delete buttons for each item
8. **Browse Products**: Visit the homepage to see products in New Arrivals and Best Sellers sections
9. **Shop Pages**: Visit `/shop-with-sidebar` or `/shop-without-sidebar` to see all products

## Database Structure

### Collections Schema
```typescript
{
  name: string;           // Collection name (e.g., "Summer Collection")
  description?: string;   // Collection description
  img?: string;          // Collection image URL
  season: 'summer' | 'winter'; // Season type
  isActive: boolean;     // Active status
  createdAt: Date;       // Creation timestamp
  updatedAt: Date;       // Last update timestamp
}
```

### Categories Schema
```typescript
{
  title: string;         // Category title (e.g., "Chicken Kaari Designs")
  description?: string;   // Category description
  img?: string;          // Category image URL
  collectionId: ObjectId; // Reference to parent collection
  isActive: boolean;     // Active status
  productCount?: number; // Number of products in this category
  createdAt: Date;       // Creation timestamp
  updatedAt: Date;       // Last update timestamp
}
```

## Troubleshooting

### Common Issues

1. **Connection Error**: Make sure MongoDB is running and connection string is correct
2. **Permission Error**: Ensure the database user has read/write permissions
3. **Duplicate Key Error**: The script clears existing data first, so this shouldn't occur

### Manual Database Reset

If you need to manually clear the database:

```javascript
// In MongoDB shell or MongoDB Compass
db.collections.deleteMany({})
db.categories.deleteMany({})
```

## Next Steps

After seeding:

1. **Add Products**: Use the admin panel to add products to categories
2. **Customize Images**: Update the placeholder image URLs with actual product images
3. **Add More Categories**: Create additional categories as needed
4. **Configure Frontend**: Update your frontend to display collections and categories

## Support

If you encounter any issues with the seeding process, check:
- MongoDB connection status
- Environment variables
- Database permissions
- Console output for specific error messages
