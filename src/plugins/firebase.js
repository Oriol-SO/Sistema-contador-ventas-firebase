
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAN4YvLrOA4nf8JJCNwiFmFZqYm28lt6b4",
    authDomain: "base-de-datos-cochachi.firebaseapp.com",
    projectId: "base-de-datos-cochachi",
    storageBucket: "base-de-datos-cochachi.appspot.com",
    messagingSenderId: "764661489792",
    appId: "1:764661489792:web:21585e692cec6062c10665",
    measurementId: "G-V9XV7CLGL0"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };