import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useAccounts = () => {
  const fetchAccounts = async () => {
    try {
      const response = await API.get("/api/accounts/");
      return response.data;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  };

  const accounts = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return accounts;
};
