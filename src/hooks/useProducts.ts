"use client";
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

interface UseProductsOptions {
  category?: string;
  limit?: number;
  page?: number;
}

interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  error?: string;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (options.category) params.append('category', options.category);
        if (options.limit) params.append('limit', options.limit.toString());
        if (options.page) params.append('page', options.page.toString());

        const response = await fetch(`/api/products?${params.toString()}`);
        const data: ProductsResponse = await response.json();

        const hashId = (s: string) => {
          let h = 0;
          for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
          return Math.abs(h);
        };

        if (data.success) {
          const mapped = (data.data as any[]).map((p) => {
            const thumbs = Array.isArray(p.imgs?.thumbnails) ? p.imgs.thumbnails : [];
            const prevs = Array.isArray(p.imgs?.previews) ? p.imgs.previews : [];
            const fallback = '/images/products/product-1-bg-1.png';
            return {
              id: p._id ? hashId(String(p._id)) : hashId(p.title + String(p.price)),
              title: p.title,
              reviews: typeof p.reviews === 'number' ? p.reviews : 0,
              price: p.price,
              discountedPrice: p.discountedPrice,
              imgs: {
                thumbnails: thumbs.length ? thumbs : [fallback],
                previews: prevs.length ? prevs : [fallback],
              },
            };
          });
          setProducts(mapped as any);
          setPagination(data.pagination || null);
        } else {
          setError(data.error || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.category, options.limit, options.page]);

  return { products, loading, error, pagination };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        const hashId = (s: string) => {
          let h = 0;
          for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
          return Math.abs(h);
        };

        if (data.success) {
          const p = data.data;
          const mapped = {
            id: p._id ? hashId(String(p._id)) : hashId(p.title + String(p.price)),
            title: p.title,
            reviews: typeof p.reviews === 'number' ? p.reviews : 0,
            price: p.price,
            discountedPrice: p.discountedPrice,
            imgs: {
              thumbnails: p.imgs?.thumbnails || [],
              previews: p.imgs?.previews || [],
            },
          } as any;
          setProduct(mapped);
        } else {
          setError(data.error || 'Failed to fetch product');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
