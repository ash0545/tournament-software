import React from "react";
import Players from "./players";
import Referees from "./referees";

function Page() {
  return (
    <div className="flex gap-6 items-start">
      <Referees />
      <Players />
    </div>
  );
}

export default Page;
