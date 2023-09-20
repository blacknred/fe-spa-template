import { API_URL } from "@/config";
import { useMutation } from '@/hooks/useMutation';

export const useDeleteCategory = (categoryId: number) => useMutation<null>(API_URL + `/categories/${categoryId}`, {
  method: 'DELETE'
});
