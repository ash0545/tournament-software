import { Tournament } from "./types";

export async function fetchTournaments(page: number = 1, size: number = 2) {
  const mockData = {
    items: [
      {
        tournament_name: "Spring Masters Classic",
        description:
          "Premier spring tournament featuring international players.",
        is_public: true,
        start_date: "2025-03-15",
        end_date: "2025-03-20",
        location: "Olympic Sports Complex",
        events: ["singles_elite", "doubles_pro"],
        tournament_id: "t_2025_spring_01",
      },
      {
        tournament_name: "City Championships",
        description: "Local championship series for city residents.",
        is_public: true,
        start_date: "2025-04-01",
        end_date: "2025-04-03",
        location: "Municipal Sports Center",
        events: ["singles_open", "mixed_doubles"],
        tournament_id: "t_2025_city_02",
      },
      {
        tournament_name: "Corporate Challenge Cup",
        description: "Inter-company tournament promoting corporate wellness.",
        is_public: false,
        start_date: "2025-03-25",
        end_date: "2025-03-27",
        location: "Business District Arena",
        events: ["team_event", "singles_casual"],
        tournament_id: "t_2025_corp_03",
      },
      {
        tournament_name: "Youth Development Series",
        description: "Tournament focused on upcoming young talent.",
        is_public: true,
        start_date: "2025-04-10",
        end_date: "2025-04-12",
        location: "Community Sports Hall",
        events: ["u15_singles", "u18_doubles"],
        tournament_id: "t_2025_youth_04",
      },
      {
        tournament_name: "Veterans Cup",
        description: "Special tournament for players over 40.",
        is_public: true,
        start_date: "2025-03-30",
        end_date: "2025-04-01",
        location: "Sunset Recreation Center",
        events: ["veterans_singles", "veterans_doubles"],
        tournament_id: "t_2025_vet_05",
      },
    ],
    total: 20,
    page: 1,
    size: 5,
    pages: 4,
  };

  setTimeout(() => console.log("Simulating delay of fetching from API."), 1000);

  const tournaments: Tournament[] = mockData.items;
  const totalTournaments = mockData.total;
  return { tournaments, totalTournaments };
}
