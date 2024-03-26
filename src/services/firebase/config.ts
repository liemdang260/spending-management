// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq0Qx8Oj1sbEFiAcNgBPjFDLOP0GeIyIE",
  authDomain: "spending-management-4177a.firebaseapp.com",
  databaseURL:
    "https://spending-management-4177a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spending-management-4177a",
  storageBucket: "spending-management-4177a.appspot.com",
  messagingSenderId: "591031616622",
  appId: "1:591031616622:web:10034ab6c23150ee81d27f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
