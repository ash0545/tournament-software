"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddEventDialog from "@/app/events/page";

function EventsTable({ event, setEvent }) {
  const remove = (index) => {
    let newEvent = [...event];
    newEvent.splice(index, 1);
    setEvent(newEvent);
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Seeding</TableHead>
            <TableHead>Max.Entries</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {event.map((event, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.type_code}</TableCell>
                <TableCell>{event.format_code}</TableCell>
                <TableCell>{event.age_restriction}</TableCell>
                <TableCell>{event.entry_fee}</TableCell>
                <TableCell>{event.seeding_count}</TableCell>
                <TableCell>{event.max_entries}</TableCell>
                <div onClick={() => remove(index)} className="cursor-pointer ">
                  <TableCell>
                    <Button variant="destructive">Remove</Button>
                  </TableCell>
                </div>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="pt-3.5">
        <AddEventDialog event={event} setEvent={setEvent} />
      </div>
    </div>
  );
}
export default EventsTable;
