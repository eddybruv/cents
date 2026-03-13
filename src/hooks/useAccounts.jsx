import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data } = await API.get("/api/accounts/");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
