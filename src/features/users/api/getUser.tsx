import { API_URL } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { User } from "../types";

export const useUser = (userId: number) => useQuery<User>(API_URL + `/users/${userId}`);
