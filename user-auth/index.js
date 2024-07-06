// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAzTcM8rxebc2vAWoUYjPXvdMj5-YOvOPQ",
//   authDomain: "login-with-firebase-3006c.firebaseapp.com",
//   projectId: "login-with-firebase-3006c",
//   storageBucket: "login-with-firebase-3006c.appspot.com",
//   messagingSenderId: "941779347091",
//   appId: "1:941779347091:web:e643074f0cc0cd4ad00f66",
//   measurementId: "G-RGKYT8DL4K",
//   databaseURL: "https://login-with-firebase-3006c-default-rtdb.asia-southeast1.firebasedatabase.app" // Updated URL
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
// const database = getDatabase(app);
// user-auth/index.js
import { auth, database } from "../shared/firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

function register() {
  const email = document.querySelector('.input-email').value;
  const password = document.querySelector('.input-password').value;
  const full_name = document.querySelector('.input-name').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password) || !validate_field(full_name)) {
    alert('Please fill out all fields correctly.');
    return;
  }

  // Move on with Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Add this user to Firebase Database
      const database_ref = ref(database, 'users/' + user.uid);
      console.log('Database Path:', database_ref.toString());

      // Create User data
      const user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now()
      };

      // Push to Firebase Database
      set(database_ref, user_data)
        .then(() => {
          console.log('User data saved successfully:', user_data);
          alert('User Created!!');
          // Redirect to main project page
          window.location.href = "../main/index.html";
        })
        .catch((error) => {
          console.error('Error saving user data:', error);
          alert('Error saving user data.');
        });
    })
    .catch((error) => {
      // Firebase will use this to alert of its errors
      const error_message = error.message;

      console.error('Error creating user:', error);
      alert(error_message);
    });
}

function login() {
  const email = document.querySelector('.input-email').value;
  const password = document.querySelector('.input-password').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert('Email or Password is Outta Line!!');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Add this user to Firebase Database
      const database_ref = ref(database, 'users/' + user.uid);

      // Create User data
      const user_data = {
        last_login: Date.now()
      };

      // Push to Firebase Database
      update(database_ref, user_data)
        .then(() => {
          console.log('User login data updated successfully:', user_data);
          alert('User Logged In!!');
          // Redirect to main project page
          window.location.href = "../main/index.html";
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
          alert('Error updating user data.');
        });
    })
    .catch((error) => {
      // Firebase will use this to alert of its errors
      const error_message = error.message;

      console.error('Error logging in user:', error);
      alert(error_message);
    });
}

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length >= 6;
}

function validate_field(field) {
  return field != null && field.length > 0;
}

// Attach functions to window object
window.register = register;
window.login = login;
