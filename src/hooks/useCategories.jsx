import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await API.get("/api/categories/");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
