import { initializeApp } from 'firebase/app'; 
import {getFirestore} from "@firebase/firestore"


const firebaseConfig = {    
    apiKey: "AIzaSyBuAZSsbEjtvArVWbQwZ5NKI2HX9KeWv4k",
    authDomain: "test-project-1-7a17a.firebaseapp.com",
    projectId: "test-project-1-7a17a",
    storageBucket: "test-project-1-7a17a.appspot.com",
    messagingSenderId: "625593521669",
    appId: "1:625593521669:web:2d96d5d7c6e40b43d96e6c"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)


