import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3NInKUSkauVxAmqkCXVWIA5W-4OHdSxk",
  authDomain: "pocketlib-cb698.firebaseapp.com",
  projectId: "pocketlib-cb698",
  storageBucket: "pocketlib-cb698.appspot.com",
  messagingSenderId: "499811163036",
  appId: "1:499811163036:web:53f4fdb95c5c3dd7840659"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseapp)