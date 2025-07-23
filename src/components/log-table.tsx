import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import ReactJson from "react-json-view";
import { Skeleton } from "./ui/skeleton";
import { DangerLevel } from "./danger-level";
import { FetchedRequestLog } from "@/schema/fetchedRequestLog";
import { formatDuration } from "@/utils/formatDuration";
import { RequestLogFullDetail } from "./request-log-full-detail";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export const LogsTableSkeleton = () => (
  <Table className="w-full flex-1">
    <TableHeader>
      <TableRow>
        <TableHead className="w-50">Info</TableHead>
        <TableHead className="w-20">Status</TableHead>
        <TableHead className="w-20">Security</TableHead>
        <TableHead className="w-20">Provider</TableHead>
        <TableHead className="w-20">Duration</TableHead>
        <TableHead className="w-sm">Token Usage</TableHead>
        <TableHead className="w-20"></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="w-full">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

export const LogsTable = ({ logs }: { logs: FetchedRequestLog[] }) => {
  const [selectedRow, setSelectedRow] = useState<FetchedRequestLog | null>(
    null,
  );
  const handleRowClick = (log: FetchedRequestLog) => {
    setSelectedRow(log);
  };
  const handleCloseDialog = () => {
    setSelectedRow(null);
  };

  return (
    <>
      <Table className="w-full flex-1">
        <TableHeader>
          <TableRow>
            <TableHead className="w-50">Info</TableHead>
            <TableHead className="w-20">Status</TableHead>
            <TableHead className="w-20">Security</TableHead>
            <TableHead className="w-20">Provider</TableHead>
            <TableHead className="w-20">Duration</TableHead>
            <TableHead className="w-sm">Token Usage</TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {logs.map((log) => (
            <TableRow key={log.responseId}>
              <TableCell>
                <p className="line-clamp-1">{log.responseId}</p>
                <p className="text-muted-foreground text-xs">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </TableCell>
              <TableCell>
                <Badge variant={log.status === 200 ? "success" : "destructive"}>
                  {log.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DangerLevel security={log.security} />
              </TableCell>
              <TableCell>{log.provider.toUpperCase()}</TableCell>
              <TableCell>{formatDuration(log.duration)}</TableCell>
              <TableCell>
                <ReactJson
                  collapsed
                  name="Usage Metadata"
                  src={log.usageMetadata}
                  enableClipboard={false}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleRowClick(log)} size="xs">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={!!selectedRow} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Full detail</DialogTitle>
          </DialogHeader>
          {selectedRow && <RequestLogFullDetail log={selectedRow} />}
        </DialogContent>
      </Dialog>
    </>
  );
};
