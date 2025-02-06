import { Tournament } from "@/components/lib/types";
import React from "react";

function TournamentHeader({ tournament }: { tournament: Tournament }) {
  return <div>Test: {tournament?.tournament_name}</div>;
}

export default TournamentHeader;
