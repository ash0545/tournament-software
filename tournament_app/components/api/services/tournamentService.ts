import { apiFetch } from "../client";
import { ROUTES } from "../routes";

export const getTournaments = (page: number, size: number) => {
  return apiFetch(ROUTES.TOURNAMENTS.getAll(page, size));
};

export const getTournamentById = (id: string) => {
  return apiFetch(ROUTES.TOURNAMENTS.getById(id));
};

// TODO: Implement createTournament, updateTournament, deleteTournament
