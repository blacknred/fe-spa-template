import { API_URL } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { Product } from "../types";

export const useProduct = (productId: number) => useQuery<Product>(API_URL + `/products/${productId}`);


