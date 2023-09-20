import { API_URL } from "@/config";
import { useAuth } from "@/features/auth";
import { useMutation } from '@/hooks/useMutation';

export const useDeleteUser = () => {
  const { profile, clearSession } = useAuth();

  const res = useMutation<null>(API_URL + `/users/${profile!.id}`, {
    method: 'DELETE'
  });

  if (res.isDone) clearSession();
  return res;
};
