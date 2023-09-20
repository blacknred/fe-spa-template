import { API_URL } from '@/config';
import { useMutation } from '@/hooks/useMutation';
import { useAuth } from '..';

export const useDeleteAuth = () => {
  const { clearSession } = useAuth();

  const res = useMutation<null>(API_URL + `/auth`, { method: 'DELETE' });

  if (res.isDone) clearSession();
  return res;
};
