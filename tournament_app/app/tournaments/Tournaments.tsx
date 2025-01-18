import { fetchTournaments } from "@/components/lib/api";
import React from "react";
import TournamentList from "./TournamentList";

async function Tournaments() {
  const { tournaments, totalTournaments } = await fetchTournaments();

  return (
    <div>
      <TournamentList tournaments={tournaments} />
    </div>
  );
}

export default Tournaments;
