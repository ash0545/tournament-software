import React from "react";

import { UserPlus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Players() {
  return (
    <Card className="flex flex-col w-2/3 min-w-[400px]">
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <CardTitle>Players</CardTitle>
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

export default Players;
