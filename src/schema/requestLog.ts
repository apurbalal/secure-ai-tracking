import z from "zod";

export const requestLogSchema = z.object({
  duration: z.number(),
  provider: z.string(),
  responseId: z.string(),
  usageMetadata: z.object({
    promptTokenCount: z.number(),
    candidatesTokenCount: z.number(),
    totalTokenCount: z.number(),
    thoughtsTokenCount: z.number(),
  }),
  url: z.string(),
  method: z.string(),
  timestamp: z.number(),
  status: z.number(),
});
export type RequestLog = z.infer<typeof requestLogSchema>;
