import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import z from "zod";
import admin from "@/config/initFirebaseAdmin";

async function streamToBuffer(
  readable: ReadableStream<Uint8Array>,
): Promise<Uint8Array> {
  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  // Concatenate all chunks into a single buffer
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

export const logSecuritySeverity = async (
  body: ReadableStream<Uint8Array<ArrayBufferLike>> | null,
  responseId: string,
) => {
  // 🧠 Read and clone the body
  const bodyBuffer = body ? await streamToBuffer(body) : null;

  // 🔒 Optional: security check or logging
  if (bodyBuffer) {
    const bodyText = new TextDecoder().decode(bodyBuffer);
    try {
      const json = JSON.parse(bodyText);
      const message = json.contents[json.contents.length - 1];

      if (message) {
        console.log("Apurbalal", message);
        // Run your validation / logging here
        const response = await generateObject({
          model: google("gemini-2.5-flash"),
          schema: z.object({
            severity: z
              .number()
              .min(1)
              .max(5)
              .describe("Security severity from 1 to 5"),
            reasoning: z
              .string()
              .describe("Explanation for the severity rating"),
          }),
          output: "object",
          prompt: `Analyze the following message for security severity (PII, Sensitive Data, or anything which might cause security issue) and provide sevirity from 1 to 5, where 1 is low severity and 5 is high severity. Provide a brief reasoning for your rating.\n\nMessage: ${JSON.stringify(message)}`,
        });
        console.log("Security Severity Response:", response.object);

        await admin.firestore().collection("ai-logs").doc(responseId).set(
          {
            security: response.object,
          },
          {
            merge: true,
          },
        );
      }
    } catch (err) {
      console.error("Error parsing body as JSON:", err);
    }
  }
};
