import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } = await API.get("/api/transactions/");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
