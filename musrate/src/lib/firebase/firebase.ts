// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {QueryClient} from 'react-query';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB70UYmVKI-IEDSScjvqubXgGLjuyF0WiI',
  authDomain: 'coraline-native.firebaseapp.com',
  projectId: 'coraline-native',
  storageBucket: 'coraline-native.appspot.com',
  messagingSenderId: '335152454520',
  appId: '1:335152454520:web:46f149cdea123b490b068d',
  measurementId: 'G-3R25KNNZY5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const queryClient = new QueryClient();
