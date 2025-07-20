import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import ReactJson from "react-json-view";
import { Skeleton } from "./ui/skeleton";
import { FetchedRequestLog } from "@/schema/fetchedRequestLog";
import { DangerLevel } from "./danger-level";
import { formatDuration } from "@/utils/formatDuration";

export const LogsTableSkeleton = () => (
  <Table className="w-full flex-1">
    <TableHeader>
      <TableRow>
        <TableHead className="w-20">ID</TableHead>
        <TableHead className="w-20">Time</TableHead>
        <TableHead className="w-20">Status</TableHead>
        <TableHead className="w-20">Method</TableHead>
        <TableHead className="w-20">Provider</TableHead>
        <TableHead className="w-20">Duration</TableHead>
        <TableHead className="w-sm">Token Usage</TableHead>
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

export const LogsTable = ({ logs }: { logs: FetchedRequestLog[] }) => (
  <Table className="w-full flex-1">
    <TableHeader>
      <TableRow>
        <TableHead className="w-50">Info</TableHead>
        <TableHead className="w-20">Status</TableHead>
        <TableHead className="w-20">Security</TableHead>
        <TableHead className="w-20">Method</TableHead>
        <TableHead className="w-20">Provider</TableHead>
        <TableHead className="w-20">Duration</TableHead>
        <TableHead className="w-sm">Token Usage</TableHead>
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
          <TableCell>{log.method}</TableCell>
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
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
