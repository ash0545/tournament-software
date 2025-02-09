import React from "react";

import { UserPlus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PersonCard from "./PersonCard";
import { ScrollArea } from "@/components/ui/scroll-area";

function Players() {
  const playerData = [
    {
      imageSrc: "https://randomuser.me/api/portraits/men/11.jpg",
      fallbackText: "TS",
      personName: "Tommy Sullivan",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/12.jpg",
      fallbackText: "AN",
      personName: "Adam Norris",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/13.jpg",
      fallbackText: "JM",
      personName: "Jake Miller",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/14.jpg",
      fallbackText: "EB",
      personName: "Ethan Brown",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/15.jpg",
      fallbackText: "RW",
      personName: "Ryan Williams",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/16.jpg",
      fallbackText: "MC",
      personName: "Max Cooper",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/17.jpg",
      fallbackText: "LB",
      personName: "Liam Brooks",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/18.jpg",
      fallbackText: "FS",
      personName: "Frank Smith",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/19.jpg",
      fallbackText: "PS",
      personName: "Paul Simmons",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/20.jpg",
      fallbackText: "DW",
      personName: "Derek Wallace",
    },
  ];

  return (
    <Card className="flex flex-col w-2/3 min-w-[400px]">
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <CardTitle>Players</CardTitle>
        <Button variant="outline">
          <UserPlus /> Add
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea
          className={"[&>[data-radix-scroll-area-viewport]]:max-h-[350px]"}
        >
          {playerData.map((player, index) => (
            <PersonCard
              key={index}
              imageSrc={player.imageSrc}
              fallbackText={player.fallbackText}
              personName={player.personName}
            />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default Players;
