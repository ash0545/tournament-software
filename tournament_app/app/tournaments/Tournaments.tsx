import { fetchTournaments } from "@/components/lib/api";
import React from "react";
import TournamentList from "./TournamentList";

interface TournamentsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: TournamentsProps) {
  const searchParams = await props.searchParams;
}

async function Tournaments(props: TournamentsProps) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt((searchParams.page as string) || "1");
  const tournamentsPerPage = parseInt((searchParams.size as string) || "2");

  const { tournaments, totalTournaments } = await fetchTournaments(
    currentPage,
    tournamentsPerPage
  );

  return (
    <div>
      <TournamentList tournaments={tournaments} />
    </div>
  );
}

export default Tournaments;
