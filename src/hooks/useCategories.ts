"use client";
import { useState, useEffect } from 'react';
import { Category } from '@/types/category';

interface CategoriesResponse {
  success: boolean;
  data: Category[];
  error?: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/categories');
        const data: CategoriesResponse = await response.json();

        const hashId = (s: string) => {
          let h = 0;
          for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
          return Math.abs(h);
        };

        if (data.success) {
          const mapped = (data.data as any[]).map((c) => ({
            id: c._id ? hashId(String(c._id)) : hashId(c.title),
            title: c.title,
            img: c.img,
          }));
          setCategories(mapped as any);
        } else {
          setError(data.error || 'Failed to fetch categories');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
