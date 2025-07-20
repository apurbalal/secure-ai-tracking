"use server";
import admin from "@/config/initFirebaseAdmin";
import { requestLogSchema } from "@/schema/requestLog";

export async function logToFirestore(log: unknown) {
  try {
    const safeParsed = requestLogSchema.safeParse(log);
    if (safeParsed.success) {
      await admin
        .firestore()
        .collection("ai-logs")
        .doc(safeParsed.data.id)
        .set(
          {
            ...safeParsed.data,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          {
            merge: true,
          },
        );
    }
  } catch (err) {
    console.error("Failed to log to Firestore", err);
  }
}
