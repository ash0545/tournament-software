export interface Event {
  event_id: string;
  event_name: string;
  tournament_id: string;
  num_of_seedings: number;
  max_entries: number;
  is_masters: boolean;
  age_restriction: number;
  description: string;
  entry_fee: number;
  event_mode: string;
}

export interface PaginatedEvents {
  items: Event[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
