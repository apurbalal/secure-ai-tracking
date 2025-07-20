"use client";
import { LogsTable, LogsTableSkeleton } from "@/components/log-table";
import { ModeToggle } from "@/components/toggle-mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetLogs } from "@/hooks/use-get-logs";
import { Search } from "lucide-react";

export default function Home() {
  const { logs, loading } = useGetLogs();

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="flex gap-2">
        <p className="text-2xl font-semibold flex-1">Secure AI Logs</p>
        <Input className="flex-1" />
        <Button variant="outline" size="icon">
          <Search />
        </Button>
        <ModeToggle />
      </div>
      <div className="grid grid-cols-1 border rounded-lg overflow-auto shadow-xs">
        {loading ? <LogsTableSkeleton /> : <LogsTable logs={logs} />}
      </div>
    </div>
  );
}
