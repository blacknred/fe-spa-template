import { API_URL } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { PaginatedResponseDto, paginatedSearchParamsSchema } from "@/types";
import { z } from "zod";
import { Role, User } from "../types";

export const getUsersDto = paginatedSearchParamsSchema.extend({
  role: z.nativeEnum(Role).optional(),
});

export type GetUsersDto = z.infer<typeof getUsersDto>;

export const useUsers = (params = '') => useQuery<PaginatedResponseDto<User>>(API_URL + `/users?${params}`);

