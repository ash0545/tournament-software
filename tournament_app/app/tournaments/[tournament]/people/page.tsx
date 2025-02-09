import React from "react";
import Players from "./Players";
import Referees from "./Referees";

function Page() {
  return (
    <div className="flex gap-6 items-start">
      <Referees />
      <Players />
    </div>
  );
}

export default Page;
