import { API_URL } from '@/config';
import { useMutation } from '@/hooks/useMutation';
import { FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '..';

export const createAuthDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateAuthDto = z.infer<typeof createAuthDto>;

export const useCreateAuth = () => {
  const { startSession } = useAuth();

  const res = useMutation<null, CreateAuthDto, FieldErrors<CreateAuthDto>>(
    API_URL + `/auth`,
    { method: 'POST' },
  );

  if (res.isDone) void startSession();

  return res;
};
