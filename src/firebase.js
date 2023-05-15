import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDSEqUIprTX7sSTYgDR8CcDre5pvgFHTrY",
    authDomain: "e-card-app-edf06.firebaseapp.com",
    projectId: "e-card-app-edf06",
    storageBucket: "e-card-app-edf06.appspot.com",
    messagingSenderId: "117634666991",
    appId: "1:117634666991:web:b1e6aac234e3da0aafa61a",
    measurementId: "G-E3RDMB32BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);

export { ref, storage };