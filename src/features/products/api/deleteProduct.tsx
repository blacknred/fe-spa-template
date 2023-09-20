import { API_URL } from "@/config";
import { useMutation } from '@/hooks/useMutation';

export const useDeleteProduct = (productId: number) => useMutation<null>(API_URL + `/products/${productId}`, {
  method: 'DELETE'
});
