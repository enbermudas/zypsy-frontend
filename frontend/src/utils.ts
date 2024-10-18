import { Category } from "@/store";

export const findCategory = (categories: Array<Category>, categoryId: string) =>
  categories.find((category) => category.id === categoryId);
