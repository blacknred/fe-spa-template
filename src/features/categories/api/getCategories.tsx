import { API_URL } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { PaginatedResponseDto, paginatedSearchParamsSchema } from "@/types";
import { z } from "zod";
import { Category } from "../types";

export const getCategoriesDto = paginatedSearchParamsSchema;

export type GetCategoriesDto = z.infer<typeof getCategoriesDto>;

export const useCategories = (params = '') => useQuery<PaginatedResponseDto<Category>>(API_URL + `/categories?${params}`);

