import { useQuery } from "@tanstack/react-query";
import API from "../api/API";

export const useInstitutions = () => {
  const fetchInstitutions = async () => {
    const { data } = await API.get("/api/institutions/");
    return data;
  };

  return useQuery({
    queryKey: ["institutions"],
    queryFn: fetchInstitutions,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};
