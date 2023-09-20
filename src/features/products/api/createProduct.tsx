
import { API_URL } from "@/config";
import { useMutation } from '@/hooks/useMutation';
import { z } from "zod";
import { Product } from "../types";
import { FieldErrors } from "react-hook-form";

export const createProductDto = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  quantity: z.number().min(1),
  categoryId: z.number().min(1),
  preview: z.string().url(),
  images: z.array(z.string().url().optional())
});

export type CreateProductDto = z.infer<typeof createProductDto>;

export const useCreateProduct = () => useMutation<Product, CreateProductDto, FieldErrors<CreateProductDto>>(API_URL + `/products`, {
  method: 'POST'
});

