import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useTransactions = () => {
  const fetchTransactions = async () => {
    try {
      const response = await API.get("/api/transactions/");
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  };

  const transactions = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return transactions;
};
