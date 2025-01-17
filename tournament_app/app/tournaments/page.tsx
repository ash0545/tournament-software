"use client";

import TournamentCard from "./TournamentCard";

const mockData = {
  items: [
    {
      tournament_name: "Spring Championship",
      description: "An exciting tournament for badminton enthusiasts.",
      is_public: true,
      start_date: "2025-02-01",
      end_date: "2025-02-05",
      location: "Central Sports Arena",
      events: ["event1", "event2"],
      tournament_id: "tournament1",
    },
    {
      tournament_name: "Winter Open",
      description: "Annual winter tournament for top players.",
      is_public: false,
      start_date: "2025-01-20",
      end_date: "2025-01-25",
      location: "Downtown Hall",
      events: ["event3", "event4"],
      tournament_id: "tournament2",
    },
  ],
  total: 10,
  page: 1,
  size: 2,
  pages: 5,
};

export default function Page() {
  return (
    <div>
      <h1>Tournaments</h1>
      <TournamentCard />
    </div>
  );
}
