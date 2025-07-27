import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp3CgCaqezhXmsBnTZusmc7e6jlFtjrRc",
  authDomain: "mct-react-9ad23.firebaseapp.com",
  projectId: "mct-react-9ad23",
  storageBucket: "mct-react-9ad23.firebasestorage.app",
  messagingSenderId: "908339186126",
  appId: "1:908339186126:web:4f6cf8c42041405e65c39f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);