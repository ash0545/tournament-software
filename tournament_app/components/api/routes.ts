export const ROUTES = {
  EVENTS: {
    getAll: (page: number = 1, size: number = 10) =>
      `events/?page=${page}&size=${size}`,
    getByTournament: (id: string, page: number = 1, size: number = 10) =>
      `events/?tournament_id=${id}&page=${page}&size=${size}`,
    getById: (id: string) => `events/${id}`,
    create: "events",
    delete: (id: string) => `events/${id}`,
    update: (id: string) => `events/${id}`,
  },
  TOURNAMENTS: {
    getAll: (page: number = 1, size: number = 10) =>
      `tournaments/?page=${page}&size=${size}`,
    getById: (id: string) => `tournaments/${id}`,
    create: "tournaments",
    delete: (id: string) => `tournaments/${id}`,
    update: (id: string) => `tournaments/${id}`,
  },
};
