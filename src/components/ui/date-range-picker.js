import { Button } from "./button";
import { Calendar } from "lucide-react";

export function DatePickerWithRange() {
  return (
    <Button variant="outline" className="justify-start w-full">
      <Calendar className="w-4 h-4 mr-2" />
      Last 30 days
    </Button>
  );
}