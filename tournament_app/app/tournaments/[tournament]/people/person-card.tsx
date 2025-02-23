import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PersonCard(props: {
  imageSrc: string;
  fallbackText: string;
  personName: string;
}) {
  return (
    <Card className="mb-2">
      <CardContent className="flex items-center gap-2 p-6 shadow-sm hover:shadow-lg transition-shadow ease-in-out">
        <Avatar>
          <AvatarImage src={props.imageSrc} />
          <AvatarFallback>{props.fallbackText}</AvatarFallback>
        </Avatar>

        <p>{props.personName}</p>
      </CardContent>
    </Card>
  );
}

export default PersonCard;
