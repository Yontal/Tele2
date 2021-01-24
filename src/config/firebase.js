import * as firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyBNk2bAC_TMh1aQS3W7k-zmhS-4YFPBfWM',
  authDomain: 'tele2-2ca41.firebaseapp.com',
  databaseURL: 'https://tele2-2ca41-default-rtdb.firebaseio.com',
  projectId: 'tele2-2ca41',
  storageBucket: 'tele2-2ca41.appspot.com',
  messagingSenderId: '829357302276',
  appId: '1:829357302276:web:499ebd6a1c47b8a78b8b51',
};

export const connectFirebase = (firebaseConfig) => {
  const promise = new Promise((resolve, reject) => {
    const app = firebase.default.initializeApp(firebaseConfig);
    resolve(app);
  });
  return promise;
};
