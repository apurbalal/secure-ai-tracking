"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetLogs } from "@/hooks/use-get-logs";

export default function Home() {
  const { logs, loading } = useGetLogs();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.responseId}>
            <TableCell className="font-medium">{log.responseId}</TableCell>
            <TableCell>
              <Badge variant={log.status === 200 ? "default" : "destructive"}>
                {log.status}
              </Badge>
            </TableCell>
            <TableCell>{log.method}</TableCell>
            <TableCell>{log.provider}</TableCell>
            <TableCell>{log.duration} ms</TableCell>
            <TableCell className="line-clamp-1">{log.url}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
