import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/components/api/routes";
import { apiFetch } from "@/app/api";

export const useFetchTournaments = (page: number = 1, size: number = 2) => {
  return useQuery({
    queryKey: ["tournaments", page, size],
    queryFn: () => apiFetch(ROUTES.TOURNAMENTS.getAll(page, size)),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
