import z from "zod";

export const fetchedRequestLogSchema = z.object({
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
  security: z
    .object({
      reasoning: z.string(),
      severity: z
        .number()
        .min(1)
        .max(5)
        .describe("Security severity from 1 to 5"),
    })
    .optional()
    .nullable(),
});

export type FetchedRequestLog = z.infer<typeof fetchedRequestLogSchema>;
