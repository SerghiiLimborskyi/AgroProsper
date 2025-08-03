import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD...твій_реальний_ключ', // встав із консолі
  authDomain: 'agroprosper.firebaseapp.com',
  projectId: 'agroprosper',
  storageBucket: 'agroprosper.appspot.com',
  messagingSenderId: '1749411381988',
  appId: '1:1749411381988:web:abcdef123456' // встав із консолі
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
