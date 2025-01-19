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

export interface Event {
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
