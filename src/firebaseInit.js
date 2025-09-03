import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your web app's Firebase configuration
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
