import admin from "@/config/initFirebaseAdmin";

export async function logToFirestore(log: any) {
  try {
    console.log("Logging to Firestore:", log);
    await admin.firestore().collection("ai-logs").add(log);
  } catch (err) {
    console.error("Failed to log to Firestore", err);
  }
}
