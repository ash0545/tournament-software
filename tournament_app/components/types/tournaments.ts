export interface Tournament {
  tournament_id: string;
  tournament_name: string;
  description: string;
  is_public: boolean;
  start_date: string;
  end_date: string;
  location: string;
  events: string[];
}

export interface PaginatedTournaments {
  items: Tournament[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
