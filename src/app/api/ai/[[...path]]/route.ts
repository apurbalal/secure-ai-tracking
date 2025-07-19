import { AI_PROVIDERS } from '@/config/ai-providers';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs'; // ensure node runtime for streaming support

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  const { path } = await params;
  return handleProxy(req, path);
}

async function handleProxy(req: NextRequest, pathSegments: string[]) {
  const [provider, ...providerPath] = pathSegments || [];
  const config = AI_PROVIDERS[provider];

  if (!config) {
    return new Response(JSON.stringify({ error: 'Unsupported AI provider' }), { status: 400 });
  }

  const providerUrl = `${config.baseUrl}/${providerPath.join('/')}${req.nextUrl.search}`;

  // const authHeader = req.headers.get('authorization');
  // if (!authHeader) {
  //   return new Response(JSON.stringify({ error: 'Missing Authorization header' }), { status: 401 });
  // }

  // Stream or JSON body
  const fetchOptions: RequestInit = {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers),
    },
    body: req.body ? req.body : undefined,
    duplex: 'half' // for streaming
  };

  console.log(`Proxying ${req.method} ${providerUrl}`);

  try {
    const providerResponse = await fetch(providerUrl, fetchOptions);

    // Stream directly to client
    return new Response(providerResponse.body, {
      status: providerResponse.status,
      headers: providerResponse.headers
    });

  } catch (err: any) {
    console.error('Proxy error', err);
    return new Response(JSON.stringify({ error: 'Proxy error', details: err.message }), { status: 500 });
  }
}