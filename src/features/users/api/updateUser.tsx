import { API_URL } from "@/config";
import { useAuth } from "@/features/auth";
import { useMutation } from '@/hooks/useMutation';
import { FieldErrors } from "react-hook-form";
import { User } from "../types";
import { CreateUserDto, createUserDto } from "./createUser";

export const updateUserDto = createUserDto.partial();

export type UpdateUserDto = Partial<CreateUserDto>;

export const useUpdateUser = () => {
  const { profile, setProfile } = useAuth();

  const res = useMutation<User, UpdateUserDto, FieldErrors<UpdateUserDto>>(API_URL + `/users/${profile!.id}`, {
    method: 'PATCH',
  });

  if (res.isDone && res.data) setProfile(res.data);
  return res;
};

