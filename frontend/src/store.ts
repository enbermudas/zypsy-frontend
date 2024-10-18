// Vendor
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Utils
import { findCategory } from "@/utils";

// Types
export interface Category {
  id: string;
  name: string;
  favorite: boolean;
}

export interface Post {
  id: string;
  description: string;
  date: string;
  categories: Array<string>;
}

export type Filter = "all" | "favorite";

interface State {
  categories: Array<Category>;
  posts: Array<Post>;
  selectedCategory: string;
  selectedFilter: Filter;
  fetchCategories: () => void;
  fetchPosts: (categoryId: string) => void;
  selectCategory: (id: string) => void;
  selectFilter: (filter: Filter) => void;
  toggleFavorite: (categoryId: string) => void;
}

const useStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        categories: [],
        posts: [],
        selectedCategory: "",
        selectedFilter: "all",
        fetchCategories: async () => {
          try {
            const response = await fetch("http://127.0.0.1:9000/categories", {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });

            const categories: Array<Category> = await response.json();
            set({ categories });
          } catch (e) {
            console.error(e);
          }
        },
        fetchPosts: async (categoryId: string) => {
          try {
            const response = await fetch(`http://127.0.0.1:9000/categories/${categoryId}/posts`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });

            const posts: Array<Post> = await response.json();
            set({ posts });
          } catch (e) {
            console.error(e);
          }
        },
        selectCategory: (id: string) => {
          set({ selectedCategory: id });
        },
        selectFilter: (filter: Filter) => {
          set({ selectedFilter: filter });
        },
        toggleFavorite: async (categoryId: string) => {
          try {
            const { categories, fetchCategories } = get();
            const category = findCategory(categories, categoryId);

            await fetch(`http://127.0.0.1:9000/categories/${categoryId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ...category,
                favorite: !category?.favorite
              })
            });

            fetchCategories();
          } catch (e) {
            console.error(e);
          }
        }
      }),
      { name: "zypsy-store" }
    )
  )
);

export default useStore;
