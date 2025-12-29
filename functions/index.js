const { setGlobalOptions } = require("firebase-functions");
const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

// Callable function to assign admin role
exports.createAdminUser = onCall(async (data, context) => {
  // Check if the caller is logged in
  if (!context.auth) {
    throw new Error("Not authenticated");
  }

  // Optional: only existing admins can create new admins
  const callerDoc = await admin.firestore().doc(`users/${context.auth.uid}`).get();
  if (!callerDoc.exists || callerDoc.data().role !== "admin") {
    throw new Error("Permission denied: Only admins can assign admin role");
  }

  const { uid, fullName, email } = data;

  if (!uid || !fullName || !email) {
    throw new Error("Missing required parameters: uid, fullName, email");
  }

  // Set the user role to admin in Firestore
  await admin.firestore().doc(`users/${uid}`).set(
    {
      fullName,
      email,
      role: "admin",
    },
    { merge: true }
  );

  return { message: `User ${fullName} is now an admin.` };
});
