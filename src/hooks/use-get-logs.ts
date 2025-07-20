"use client";
import {
  FetchedRequestLog,
  fetchedRequestLogSchema,
} from "@/schema/fetchedRequestLog";
import { useEffect, useState } from "react";

export const useGetLogs = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<FetchedRequestLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/get-logs", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch logs");
        }

        const data = await response.json();
        const parsedLogs = data.map((log: unknown) =>
          fetchedRequestLogSchema.parse(log),
        );
        setLogs(parsedLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchLogs();
  }, []);

  return { logs, loading };
};
