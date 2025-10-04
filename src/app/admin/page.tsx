"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
  <button
    onClick={() => setActiveTab('products')}
    className={`py-2 px-1 border-b-2 font-medium text-sm ${
      activeTab === 'products'
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    Products
  </button>

  <button
    onClick={() => setActiveTab('categories')}
    className={`py-2 px-1 border-b-2 font-medium text-sm ${
      activeTab === 'categories'
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    Categories
  </button>

  <button
    onClick={() => setActiveTab('collections')}
    className={`py-2 px-1 border-b-2 font-medium text-sm ${
      activeTab === 'collections'
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    Collections
  </button>
</nav>

        </div>

        {/* Content */}
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'categories' && <CategoryManagement />}
        {activeTab === 'collections' && <CollectionManagement />}
      </div>
    </div>
  );
};

const ProductManagement = () => {
  type ProductDoc = {
    _id: string;
    title: string;
    price: number;
    discountedPrice: number;
    reviews?: number;
    imgs?: { thumbnails: string[]; previews: string[] };
  };

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    discountedPrice: '',
    reviews: '0',
    description: '',
    category: '',
    brand: '',
    inStock: true,
    thumbnails: ['', ''],
    previews: ['', ''],
  });
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDoc | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products?limit=100');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          price: parseFloat(formData.price),
          discountedPrice: parseFloat(formData.discountedPrice),
          reviews: parseInt(formData.reviews),
          description: formData.description,
          category: formData.category,
          brand: formData.brand,
          inStock: formData.inStock,
          imgs: {
            thumbnails: formData.thumbnails.filter(Boolean),
            previews: formData.previews.filter(Boolean),
          },
        }),
      });

      if (response.ok) {
        setFormData({
          title: '',
          price: '',
          discountedPrice: '',
          reviews: '0',
          description: '',
          category: '',
          brand: '',
          inStock: true,
          thumbnails: ['', ''],
          previews: ['', ''],
        });
        await loadProducts();
        alert('Product added successfully!');
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert('Failed to delete');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.discountedPrice}
                onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reviews Count</label>
              <input
                type="number"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail Images (comma-separated URLs)</label>
              <input
                type="text"
                value={formData.thumbnails.join(', ')}
                onChange={(e) => setFormData({ ...formData, thumbnails: e.target.value.split(', ') })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preview Images (comma-separated URLs)</label>
              <input
                type="text"
                value={formData.previews.join(', ')}
                onChange={(e) => setFormData({ ...formData, previews: e.target.value.split(', ') })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">In Stock</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Products</h3>
          <button onClick={loadProducts} className="text-sm text-blue-600 hover:underline">Refresh</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4">Discount</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="py-2 pr-4">{p.title}</td>
                    <td className="py-2 pr-4">${p.price}</td>
                    <td className="py-2 pr-4">${p.discountedPrice}</td>
                    <td className="py-2 pr-4 space-x-4">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await fetch(`/api/products/${editingProduct._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  title: editingProduct.title,
                  price: editingProduct.price,
                  discountedPrice: editingProduct.discountedPrice,
                  imgs: editingProduct.imgs || { thumbnails: [], previews: [] },
                }),
              });
              if (res.ok) {
                await loadProducts();
                setEditingProduct(null);
                alert('Product updated');
              } else {
                alert('Failed to update');
              }
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discounted</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.discountedPrice}
                  onChange={(e) => setEditingProduct({ ...editingProduct, discountedPrice: parseFloat(e.target.value) })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Thumbnails (comma-separated)</label>
                <input
                  type="text"
                  value={(editingProduct.imgs?.thumbnails || []).join(', ')}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imgs: { ...editingProduct.imgs, thumbnails: e.target.value.split(', ').filter(Boolean), previews: editingProduct.imgs?.previews || [] } })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Previews (comma-separated)</label>
                <input
                  type="text"
                  value={(editingProduct.imgs?.previews || []).join(', ')}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imgs: { ...editingProduct.imgs, thumbnails: editingProduct.imgs?.thumbnails || [], previews: e.target.value.split(', ').filter(Boolean) } })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">Save</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="py-2 px-4 rounded-md border">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
const CollectionManagement = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    img: '', 
    season: 'summer' as 'summer' | 'winter',
    isActive: true 
  });
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any | null>(null);

  const loadCollections = async () => {
    setLoading(true);
    const res = await fetch('/api/collections');
    const data = await res.json();
    if (data.success) setCollections(data.data);
    setLoading(false);
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setFormData({ name: '', description: '', img: '', season: 'summer', isActive: true });
        await loadCollections();
        alert('Collection added successfully!');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to add collection'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding collection');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollection) return;
    
    try {
      const res = await fetch(`/api/collections/${editingCollection._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCollection),
      });
      
      if (res.ok) {
        await loadCollections();
        setEditingCollection(null);
        alert('Collection updated successfully!');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to update collection'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating collection');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this collection? This will also delete all associated categories.')) return;
    
    try {
      const res = await fetch(`/api/collections/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadCollections();
        alert('Collection deleted successfully!');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to delete collection'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting collection');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {editingCollection ? 'Edit Collection' : 'Add New Collection'}
        </h2>
        <form onSubmit={editingCollection ? handleEdit : handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Collection Name</label>
              <input
                type="text"
                required
                value={editingCollection ? editingCollection.name : formData.name}
                onChange={(e) => editingCollection 
                  ? setEditingCollection({ ...editingCollection, name: e.target.value })
                  : setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Season</label>
              <select
                required
                value={editingCollection ? editingCollection.season : formData.season}
                onChange={(e) => editingCollection 
                  ? setEditingCollection({ ...editingCollection, season: e.target.value as 'summer' | 'winter' })
                  : setFormData({ ...formData, season: e.target.value as 'summer' | 'winter' })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editingCollection ? editingCollection.description : formData.description}
              onChange={(e) => editingCollection 
                ? setEditingCollection({ ...editingCollection, description: e.target.value })
                : setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={editingCollection ? editingCollection.img : formData.img}
              onChange={(e) => editingCollection 
                ? setEditingCollection({ ...editingCollection, img: e.target.value })
                : setFormData({ ...formData, img: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={editingCollection ? editingCollection.isActive : formData.isActive}
              onChange={(e) => editingCollection 
                ? setEditingCollection({ ...editingCollection, isActive: e.target.checked })
                : setFormData({ ...formData, isActive: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Active</label>
          </div>

          <div className="flex gap-3">
            <button 
              type="submit" 
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {editingCollection ? 'Update Collection' : 'Add Collection'}
            </button>
            {editingCollection && (
              <button 
                type="button" 
                onClick={() => setEditingCollection(null)} 
                className="py-2 px-4 rounded-md border hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Collections</h3>
          <button onClick={loadCollections} className="text-sm text-blue-600 hover:underline">Refresh</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Season</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((c) => (
                  <tr key={c._id} className="border-b">
                    <td className="py-2 pr-4">{c.name}</td>
                    <td className="py-2 pr-4 capitalize">{c.season}</td>
                    <td className="py-2 pr-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        c.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {c.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2 pr-4 space-x-2">
                      <button
                        onClick={() => setEditingCollection(c)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};


const CategoryManagement = () => {
  type CategoryDoc = { 
    _id: string; 
    title: string; 
    img: string; 
    description?: string; 
    collectionId: string;
    isActive: boolean;
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    img: '',
    collectionId: '',
    isActive: true,
  });
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDoc | null>(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } finally {
      setLoading(false);
    }
  };

  const loadCollections = async () => {
    try {
      const res = await fetch('/api/collections');
      const data = await res.json();
      if (data.success) setCollections(data.data);
    } catch (error) {
      console.error('Error loading collections:', error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadCollections();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          img: '',
          collectionId: '',
          isActive: true,
        });
        await loadCategories();
        alert('Category added successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to add category'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding category');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    try {
      const response = await fetch(`/api/categories/${editingCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCategory),
      });

      if (response.ok) {
        await loadCategories();
        setEditingCategory(null);
        alert('Category updated successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to update category'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? This will also delete all associated products.')) return;
    
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadCategories();
        alert('Category deleted successfully!');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to delete category'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting category');
    }
  };

  const getCollectionName = (collectionId: string) => {
    const collection = collections.find(c => c._id === collectionId);
    return collection ? collection.name : 'Unknown Collection';
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </h2>
        <form onSubmit={editingCategory ? handleEdit : handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Title</label>
              <input
                type="text"
                required
                value={editingCategory ? editingCategory.title : formData.title}
                onChange={(e) => editingCategory 
                  ? setEditingCategory({ ...editingCategory, title: e.target.value })
                  : setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Collection</label>
              <select
                required
                value={editingCategory ? editingCategory.collectionId : formData.collectionId}
                onChange={(e) => editingCategory 
                  ? setEditingCategory({ ...editingCategory, collectionId: e.target.value })
                  : setFormData({ ...formData, collectionId: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a Collection</option>
                {collections.map((collection) => (
                  <option key={collection._id} value={collection._id}>
                    {collection.name} ({collection.season})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editingCategory ? editingCategory.description : formData.description}
              onChange={(e) => editingCategory 
                ? setEditingCategory({ ...editingCategory, description: e.target.value })
                : setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              required
              value={editingCategory ? editingCategory.img : formData.img}
              onChange={(e) => editingCategory 
                ? setEditingCategory({ ...editingCategory, img: e.target.value })
                : setFormData({ ...formData, img: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={editingCategory ? editingCategory.isActive : formData.isActive}
              onChange={(e) => editingCategory 
                ? setEditingCategory({ ...editingCategory, isActive: e.target.checked })
                : setFormData({ ...formData, isActive: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Active</label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
            {editingCategory && (
              <button 
                type="button" 
                onClick={() => setEditingCategory(null)} 
                className="py-2 px-4 rounded-md border hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Categories</h3>
          <button onClick={loadCategories} className="text-sm text-blue-600 hover:underline">Refresh</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Collection</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id} className="border-b">
                    <td className="py-2 pr-4">{c.title}</td>
                    <td className="py-2 pr-4">{getCollectionName(c.collectionId)}</td>
                    <td className="py-2 pr-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        c.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {c.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2 pr-4 space-x-2">
                      <button
                        onClick={() => setEditingCategory(c)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
