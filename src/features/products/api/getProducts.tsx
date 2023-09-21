import { API_URL } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { PaginatedResponseDto, paginatedSearchParamsSchema } from "@/types";
import { z } from "zod";
import { Product } from "../types";

export const getProductsDto = paginatedSearchParamsSchema.extend({
  categoryId: z.string().min(1).optional(),
});

export type GetProductsDto = z.infer<typeof getProductsDto>;

export const useProducts = (params = '') => useQuery<PaginatedResponseDto<Product>>(API_URL + `/products?${params}`);


