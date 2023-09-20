import { API_URL } from "@/config";
import { useMutation } from '@/hooks/useMutation';
import { FieldErrors } from "react-hook-form";
import { CreateCategoryDto, createCategoryDto } from "..";
import { Category } from "../types";

export const updateCategoryDto = createCategoryDto.partial();

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export const useUpdateCategory = (categoryId: number) => useMutation<Category, UpdateCategoryDto, FieldErrors<UpdateCategoryDto>>(API_URL + `/categories/${categoryId}`, {
  method: 'PATCH'
});

