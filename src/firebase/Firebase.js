import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCVtzZSdkvUHSCN62rN6fSHohL11FF-OfI",
  authDomain: "onlinepackagingservice.firebaseapp.com",
  projectId: "onlinepackagingservice",
  storageBucket: "onlinepackagingservice.appspot.com",
  messagingSenderId: "879490311810",
  appId: "1:879490311810:web:a6612670ad0ec95515369b",
  measurementId: "G-EJ75CSCGKM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth
export const auth = getAuth(app);

// ✅ Firestore DB
export const db = getFirestore(app);

// ✅ Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
