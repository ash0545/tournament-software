import React from "react";

import { UserPlus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Referees() {
  return (
    <Card className="flex flex-col w-1/3 min-w-[250px]">
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <CardTitle>Referees</CardTitle>
        <Button variant="outline">
          <UserPlus /> Add
        </Button>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
}

export default Referees;
