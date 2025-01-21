import { Event, PaginatedEvents } from "../../types/events";
import { apiClient } from "../client";
import { ROUTES } from "../routes";

export const eventsApi = {
  getAll: () => apiClient.get<PaginatedEvents>(ROUTES.EVENTS.getAll),
  getByTournament: (id: string) =>
    apiClient.get<PaginatedEvents>(ROUTES.EVENTS.getByTournament(id)),
  getById: (id: string) =>
    apiClient.get<PaginatedEvents>(ROUTES.EVENTS.getById(id)),
  create: (event: Omit<Event, "event_id">) =>
    apiClient.post<Event>(ROUTES.EVENTS.create, event),
  delete: (id: string) => apiClient.delete<string>(ROUTES.EVENTS.delete(id)),
  update: (id: string, event: Omit<Event, "event_id">) =>
    apiClient.put<Event>(ROUTES.EVENTS.update(id), event),
};
