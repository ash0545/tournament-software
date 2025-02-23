import React from "react";

import { UserPlus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PersonCard from "./person-card";
import { ScrollArea } from "@/components/ui/scroll-area";

function Referees() {
  const refereeData = [
    {
      imageSrc: "https://randomuser.me/api/portraits/men/1.jpg",
      fallbackText: "JS",
      personName: "John Smith",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/2.jpg",
      fallbackText: "MP",
      personName: "Mark Peterson",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/3.jpg",
      fallbackText: "RM",
      personName: "Richard Moore",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/4.jpg",
      fallbackText: "DW",
      personName: "David Williams",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/5.jpg",
      fallbackText: "TP",
      personName: "Thomas Parker",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/6.jpg",
      fallbackText: "BJ",
      personName: "Brian Johnson",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/7.jpg",
      fallbackText: "JS",
      personName: "James Stevens",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/8.jpg",
      fallbackText: "AW",
      personName: "Alan White",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/9.jpg",
      fallbackText: "CK",
      personName: "Charles King",
    },
    {
      imageSrc: "https://randomuser.me/api/portraits/men/10.jpg",
      fallbackText: "MC",
      personName: "Matthew Clark",
    },
  ];

  return (
    <Card className="flex flex-col w-1/3 min-w-[250px]">
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <CardTitle>Referees</CardTitle>
        <Button variant="outline">
          <UserPlus /> Add
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea
          className={"[&>[data-radix-scroll-area-viewport]]:max-h-[350px]"}
        >
          {refereeData.map((referee, index) => (
            <PersonCard
              key={index}
              imageSrc={referee.imageSrc}
              fallbackText={referee.fallbackText}
              personName={referee.personName}
            />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default Referees;
