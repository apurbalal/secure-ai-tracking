import { AI_PROVIDERS } from "@/config/ai-providers";
import { logToFirestore } from "@/utils/logToFirestore";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensure node runtime for streaming support

type Params = Promise<{ path: string[] }>;

// HTTP Method Handlers
export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { path } = await params;
  return handleProxy(req, path);
}

// Proxy Handler
async function handleProxy(req: NextRequest, pathSegments: string[]) {
  const [provider, ...providerPath] = pathSegments || [];
  const config = AI_PROVIDERS[provider];

  if (!config) {
    return NextResponse.json(
      { error: "Unsupported AI provider" },
      { status: 400 },
    );
  }

  const targetUrl = `${config.baseUrl}/${providerPath.join("/")}${req.nextUrl.search}`;
  const startTime = Date.now();

  const fetchOptions: RequestInit = {
    method: req.method,
    headers: req.headers,
    body: req.body,
    duplex: "half",
  };

  try {
    const aiResponse = await fetch(targetUrl, fetchOptions);
    const reader = aiResponse.body?.getReader();
    let usageMetadata: Record<string, any> = {};
    let responseId = aiResponse.headers.get("x-response-id") || "";
    const stream = new ReadableStream({
      async pull(controller) {
        if (!reader) {
          controller.close();
          return;
        }

        const { done, value } = await reader.read();

        if (value) {
          const chunkString = new TextDecoder().decode(value);

          try {
            const jsonObject = JSON.parse(chunkString.replace(/^data:\s*/, ""));
            if (jsonObject.usageMetadata) {
              usageMetadata = jsonObject.usageMetadata;
            }
            if (jsonObject.responseId) {
              responseId = jsonObject.responseId;
            }
          } catch {
            // Ignore parsing errors for non-JSON chunks
          }

          controller.enqueue(value);
        }

        if (done) {
          controller.close();

          const duration = Date.now() - startTime;

          // Log request metadata to Firestore
          await logToFirestore({
            duration,
            provider,
            responseId,
            usageMetadata,
            url: targetUrl,
            method: req.method,
            timestamp: startTime,
            status: aiResponse.status,
          });
        }
      },
    });

    return new Response(stream, {
      status: aiResponse.status,
      headers: aiResponse.headers,
    });
  } catch (err) {
    const errorMessage =
      typeof err === "object" && err !== null && "message" in err
        ? (err as { message: string }).message
        : String(err);

    return NextResponse.json(
      { error: "Proxy error", details: errorMessage },
      { status: 500 },
    );
  }
}
