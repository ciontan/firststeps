import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, addDoc } from "firebase/firestore";

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

async function copyProductDocument() {
  const collectionName = "products-template";
  const originalDocId = "LxSVyBbK95riVG9By7kh";

  // Reference to the original document
  const originalDocRef = doc(db, collectionName, originalDocId);

  // Read the original document
  const originalDocSnap = await getDoc(originalDocRef);

  if (originalDocSnap.exists()) {
    const data = originalDocSnap.data();

    // Write a new document with the same data (new ID)
    const newDocRef = await addDoc(collection(db, collectionName), data);

    console.log("Document copied with new ID:", newDocRef.id);
  } else {
    console.log("Original document does not exist.");
  }
}

// Run the function
copyProductDocument();