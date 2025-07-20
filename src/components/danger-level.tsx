import { FetchedRequestLog } from "@/schema/fetchedRequestLog";
import { useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const DangerLevel = ({
  security,
}: {
  security: FetchedRequestLog["security"];
}) => {
  const color = useMemo(() => {
    if (security?.severity === 1) return "bg-green-500";
    if (security?.severity === 2) return "bg-lime-500";
    if (security?.severity === 3) return "bg-yellow-500";
    if (security?.severity === 4) return "bg-orange-500";
    return "bg-red-500";
  }, [security?.severity]);

  if (!security) return null;
  return (
    <Popover>
      <PopoverTrigger className="flex gap-1 cursor-pointer">
        {Array.from({ length: security.severity }).map((_, index) => (
          <div className={`h-5 w-1 ${color}`} key={index} />
        ))}
        {Array.from({ length: 5 - security.severity }).map((_, index) => (
          <div
            className="h-5 w-1 bg-gray-300"
            key={index + 5 - security.severity + 1}
          />
        ))}
      </PopoverTrigger>
      <PopoverContent className="text-sm">{security.reasoning}</PopoverContent>
    </Popover>
  );
};
