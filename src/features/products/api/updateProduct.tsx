import { API_URL } from "@/config";
import { useMutation } from '@/hooks/useMutation';
import { FieldErrors } from "react-hook-form";
import { Product } from "../types";
import { CreateProductDto, createProductDto } from "./createProduct";

export const updateProductDto = createProductDto.partial();

export type UpdateProductDto = Partial<CreateProductDto>;

export const useUpdateProduct = (productId: number) => useMutation<Product, UpdateProductDto, FieldErrors<UpdateProductDto>>(API_URL + `/products/${productId}`, {
  method: 'PATCH'
});
