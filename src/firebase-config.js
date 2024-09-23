import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm9d02eckIRFrqOalHSzaDvlKYZecWPfI",
  authDomain: "register-1676b.firebaseapp.com",
  projectId: "register-1676b",
  storageBucket: "register-1676b.appspot.com",
  messagingSenderId: "1089228389486",
  appId: "1:1089228389486:web:c19a5085b302d0e3837a7f",
  measurementId: "G-M7E68DE22W",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
