import { FetchedRequestLog } from "@/schema/fetchedRequestLog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { formatDuration } from "@/utils/formatDuration";
import ReactJson from "react-json-view";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

const Row = ({ title, detail }: { title: string; detail: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(String(detail));
    setCopied(true);
    toast.success("Copied to clipboard", {
      duration: 2000,
      position: "bottom-center",
      closeButton: true,
    });
    timer.current = setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  }, [detail]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{title}</TableCell>
      <TableCell>{detail}</TableCell>
      <TableCell>
        <Button
          onClick={handleCopy}
          size="icon"
          variant="ghost"
          className="text-muted-foreground"
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export const RequestLogFullDetail = ({ log }: { log: FetchedRequestLog }) => {
  return (
    <Table className="w-full flex-1">
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Title</TableHead>
          <TableHead className="flex-1">Detail</TableHead>
          <TableHead className="w-7"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        <Row title="UUID" detail={log.responseId} />
        <Row title="Response Id" detail={log.responseId} />
        <Row title="Provider" detail={log.provider.toUpperCase()} />
        <Row
          title="Status"
          detail={
            <Badge variant={log.status === 200 ? "success" : "destructive"}>
              {log.status}
            </Badge>
          }
        />
        <Row title="Method" detail={log.method} />
        <Row
          title="Timestamp"
          detail={new Date(log.timestamp).toLocaleString()}
        />
        <Row title="Duration" detail={formatDuration(log.duration)} />
        <Row
          title="Usage"
          detail={<ReactJson src={log.usageMetadata} enableClipboard={false} />}
        />
      </TableBody>
    </Table>
  );
};
