// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwaShR4WBGU-WIcBdA0YxTaJqraJpY9SI",
  authDomain: "chat-app-ab3aa.firebaseapp.com",
  projectId: "chat-app-ab3aa",
  storageBucket: "chat-app-ab3aa.firebasestorage.app",
  messagingSenderId: "266940220162",
  appId: "1:266940220162:web:d43176974ab77372ff781b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);