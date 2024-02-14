import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDRcgNf8S111d9z8KwITqIqZKmW6J7QyYw",
  authDomain: "mern-auth-5fe0d.firebaseapp.com",
  projectId: "mern-auth-5fe0d",
  storageBucket: "mern-auth-5fe0d.appspot.com",
  messagingSenderId: "438383305270",
  appId: "1:438383305270:web:7351161d2b6cbee700ee97",
};

export const firebase = initializeApp(firebaseConfig);
