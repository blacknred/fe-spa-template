
import { API_URL } from "@/config";
import { useMutation } from '@/hooks/useMutation';
import { z } from "zod";
import { User } from "../types";
import { FieldErrors } from "react-hook-form";

export const createUserDto = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  image: z.string().url().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  password: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof createUserDto>;

export const useCreateUser = () => useMutation<User, CreateUserDto, FieldErrors<CreateUserDto>>(API_URL + `/users`, { method: 'POST' });



