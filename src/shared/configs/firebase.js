import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVVh2dgoHLuk8UmvbYW5V9xQrYzLaJNoo",
  authDomain: "manganda-2ae88.firebaseapp.com",
  projectId: "manganda-2ae88",
  storageBucket: "manganda-2ae88.appspot.com",
  messagingSenderId: "92695431659",
  appId: "1:92695431659:web:4789187fe29d5bc5acb1ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { app, firestore, auth };
