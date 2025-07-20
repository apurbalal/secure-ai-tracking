import admin from "@/config/initFirebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const resp = await admin
    .firestore()
    .collection("ai-logs")
    .orderBy("createdAt", "desc")
    .limit(100)
    .get();

  return NextResponse.json(
    resp.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
    { status: 200 },
  );
}
