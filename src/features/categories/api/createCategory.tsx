import { API_URL } from "@/config";
import { useMutation } from '@/hooks/useMutation';
import { FieldErrors } from "react-hook-form";
import { z } from "zod";
import { Category } from "../types";

export const createCategoryDto = z.object({
  name: z.string().min(1),
  image: z.string().url(),
});

export type CreateCategoryDto = z.infer<typeof createCategoryDto>;

export const useCreateCategory = () => useMutation<Category, CreateCategoryDto, FieldErrors<CreateCategoryDto>>(API_URL + `/categories`, {
  method: 'POST'
});

