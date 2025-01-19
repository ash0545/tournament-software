import React from "react";

async function Page({ params }: { params: Promise<{ tournament: string }> }) {
  const tournamentID = (await params).tournament;
  return <div>Test: {tournamentID}</div>;
}

export default Page;
