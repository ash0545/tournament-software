import { useQuery } from "@tanstack/react-query";
import {
  getTournaments,
  getTournamentById,
} from "../services/tournamentService";

export const useFetchTournaments = (page: number, size: number) => {
  return useQuery({
    queryKey: ["tournaments", page, size],
    queryFn: () => getTournaments(page, size),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchTournamentById = (id: string) => {
  return useQuery({
    queryKey: ["tournament", id],
    queryFn: () => getTournamentById(id),
    enabled: !!id, // Only fetch if ID is provided
  });
};
