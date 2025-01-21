export const ROUTES = {
  EVENTS: {
    getAll: "events",
    getByTournament: (id: string) => `events?tournament_id=${id}`,
    getById: (id: string) => `events/${id}`,
    create: "events",
    delete: (id: string) => `events/${id}`,
    update: (id: string) => `events/${id}`,
  },
  TOURNAMENTS: {
    getAll: "tournaments",
    getById: (id: string) => `tournaments/${id}`,
    create: "tournaments",
    delete: (id: string) => `tournaments/${id}`,
    update: (id: string) => `tournaments/${id}`,
  },
};
