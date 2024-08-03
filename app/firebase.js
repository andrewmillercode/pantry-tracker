// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV-10gFI5Fg8om5zQDXTbLx2LkKnnfZV8",
  authDomain: "pantry-bd1e5.firebaseapp.com",
  projectId: "pantry-bd1e5",
  storageBucket: "pantry-bd1e5.appspot.com",
  messagingSenderId: "382660998734",
  appId: "1:382660998734:web:efb1504b5352b799e9b51f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };