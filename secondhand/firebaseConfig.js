
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChYIY07bLAWX2eCfn2jOSFnVxDhO9SblM",
  authDomain: "secondhand-54edb.firebaseapp.com",
  projectId: "secondhand-54edb",
  storageBucket: "secondhand-54edb.firebasestorage.app",
  messagingSenderId: "189408722916",
  appId: "1:189408722916:web:bffb02014fccb52f8651f1",
  measurementId: "G-K5LV9LD0T5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };