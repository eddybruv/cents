import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useInstitutions = () => {
  return useQuery({
    queryKey: ["institutions"],
    queryFn: async () => {
      const { data } = await API.get("/api/institutions/");
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
