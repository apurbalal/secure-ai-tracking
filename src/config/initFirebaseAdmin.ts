import "server-only";
import admin from "firebase-admin";
import { firebaseConfig } from "./initFirebase";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        // @ts-expect-error FixMe
        type: process.env.firebase_type,
        project_id: process.env.firebase_project_id,
        private_key_id: process.env.firebase_private_key_id,
        private_key: process.env.firebase_private_key?.replace(/\\n/gm, "\n"),
        client_email: process.env.firebase_client_email,
        client_id: process.env.firebase_client_id,
        auth_uri: process.env.firebase_auth_uri,
        token_uri: process.env.firebase_token_uri,
        auth_provider_x509_cert_url:
          process.env.firebase_auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.firebase_client_x509_cert_url,
        universe_domain: process.env.firebase_universe_domain,
      }),
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
    });
    admin.firestore().settings({ ignoreUndefinedProperties: true });
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
  }
}

export default admin;
