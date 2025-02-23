import { number } from "zod";
import { apiFetch } from "../client";
import { ROUTES } from "../routes";

export const getEvents = (page: number, size: number) => {
  return apiFetch(ROUTES.EVENTS.getAll(page, size));
};

export const getEventsByTournament = (
  id: string,
  page: number,
  size: number
) => {
  return apiFetch(ROUTES.EVENTS.getByTournament(id, page, size));
};

export const getEventById = (id: string) => {
  return apiFetch(ROUTES.EVENTS.getById(id));
};
// TODO: Implement createEvent, updateEvent, deleteEvent
