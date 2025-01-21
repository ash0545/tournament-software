import { Tournament, PaginatedTournaments } from "../../types/tournaments";
import { apiClient } from "../client";
import { ROUTES } from "../routes";

export const tournamentsApi = {
  getAll: (page: number = 1, size: number = 10) =>
    apiClient.get<PaginatedTournaments>(ROUTES.TOURNAMENTS.getAll(page, size)),
  getById: (id: string) =>
    apiClient.get<PaginatedTournaments>(ROUTES.TOURNAMENTS.getById(id)),
  create: (tournament: Omit<Tournament, "tournament_id">) =>
    apiClient.post<Tournament>(ROUTES.TOURNAMENTS.create, tournament),
  delete: (id: string) =>
    apiClient.delete<string>(ROUTES.TOURNAMENTS.delete(id)),
  update: (id: string, tournament: Omit<Tournament, "tournament_id">) =>
    apiClient.put<Tournament>(ROUTES.TOURNAMENTS.update(id), tournament),
};
