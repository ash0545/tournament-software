"use client";

import { useFetchTournamentById } from "@/components/api/hooks/useTournaments";
import React from "react";
import { use } from "react";

function Page({ params }: { params: Promise<{ tournament: string }> }) {
  const t = use(params);
  const tournamentId = t.tournament;

  const { data, error, isLoading } = useFetchTournamentById(tournamentId);
  return <div>Test: {data?.tournament_name}</div>;
}

export default Page;
