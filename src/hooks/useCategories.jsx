import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useCategories = () => {
  const fetchCategories = async () => {
    try {
      const response = await API.get("/api/categories/");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return categories;
};
