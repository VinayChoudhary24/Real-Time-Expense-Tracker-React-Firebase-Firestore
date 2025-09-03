import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiss0wE4uUP7p-Kbom3tTjb-ke89tf2fE",
  authDomain: "blog-app-ebc14.firebaseapp.com",
  projectId: "blog-app-ebc14",
  storageBucket: "blog-app-ebc14.firebasestorage.app",
  messagingSenderId: "59986246421",
  appId: "1:59986246421:web:31efeebd27f41daede071c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
