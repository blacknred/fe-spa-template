import { API_URL } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { Category } from "../types";

export const useCategory = (categoryId: number) => useQuery<Category>(API_URL + `/categories/${categoryId}`);


