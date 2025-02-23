import { useQuery } from "@tanstack/react-query";
import {
  getEvents,
  getEventById,
  getEventsByTournament,
} from "../services/event-service";

export const useFetchEvents = (page: number, size: number) => {
  return useQuery({
    queryKey: ["events", page, size],
    queryFn: () => getEvents(page, size),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchEventsByTournament = (
  id: string,
  page: number,
  size: number
) => {
  return useQuery({
    queryKey: ["events", page, size],
    queryFn: () => getEventsByTournament(id, page, size),
    staleTime: 5 * 60 * 1000,
    enabled: !!id, // Only fetch if ID is provided
  });
};

export const useFetchEventById = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: !!id, // Only fetch if ID is provided
  });
};
