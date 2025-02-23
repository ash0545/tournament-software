"use client";

import { useFetchTournaments } from "@/components/api/hooks/use-tournaments";
import TournamentList from "./tournaments-list";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

interface TournamentsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function Tournaments({ searchParams }: TournamentsProps) {
  const currentPage = parseInt((searchParams.page as string) || "1");
  const tournamentsPerPage = parseInt((searchParams.size as string) || "2");

  const { data, error, isLoading } = useFetchTournaments(
    currentPage,
    tournamentsPerPage
  );

  if (isLoading) return <div>Loading tournaments...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <TournamentList tournaments={data?.items || []} />
      <PaginationWithLinks
        page={currentPage}
        pageSize={tournamentsPerPage}
        totalCount={data?.total || 0}
      />
    </div>
  );
}

export default Tournaments;
