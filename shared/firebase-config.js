// shared/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzTcM8rxebc2vAWoUYjPXvdMj5-YOvOPQ",
  authDomain: "login-with-firebase-3006c.firebaseapp.com",
  projectId: "login-with-firebase-3006c",
  storageBucket: "login-with-firebase-3006c.appspot.com",
  messagingSenderId: "941779347091",
  appId: "1:941779347091:web:e643074f0cc0cd4ad00f66",
  measurementId: "G-RGKYT8DL4K",
  databaseURL: "https://login-with-firebase-3006c-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

export { auth, database };
