// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyAUEiELlqboyzhN7Bi5-LRmDc5wTLGxNzk',
   authDomain: 'note-app-clone.firebaseapp.com',
   projectId: 'note-app-clone',
   storageBucket: 'note-app-clone.appspot.com',
   messagingSenderId: '742807683745',
   appId: '1:742807683745:web:9aafd8002d8d286d3de6e0',
   measurementId: 'G-Y77F727KWV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
