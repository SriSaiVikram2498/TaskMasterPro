import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
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
const auth = getAuth();
const database = getDatabase(app);

let todos = [];

// Function to load todos for the authenticated user
function loadTodos() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user);
      const userId = user.uid;
      const todosRef = ref(database, 'todos/' + userId);

      get(todosRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            todos = snapshot.val();
            renderTodo();
          } else {
            console.log("No todos found for this user.");
          }
        })
        .catch((error) => {
          console.error("Error loading todos:", error);
        });
    } else {
      console.log("No user is logged in.");
    }
  });
}

// Function to save todos for the authenticated user
function saveTodos() {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    const todosRef = ref(database, 'todos/' + userId);
    set(todosRef, todos)
      .then(() => {
        console.log("Todos saved successfully.");
      })
      .catch((error) => {
        console.error("Error saving todos:", error);
      });
  }
}

// Function to sign out the user
function signOutUser() {
  signOut(auth).then(() => {
    window.location.href = "../user-auth/index.html";
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
}

function addTodo() {
  const todo = document.querySelector('.input-box').value;
  todos.push(todo);
  document.querySelector('.input-box').value = "";
  saveTodos();
  renderTodo();
}

function renderTodo() {
  let render_todos = "";
  todos.forEach((todo, index) => {
    render_todos += `
      <div>
        <input type="checkbox" class="todo-checkbox js-checkbox-${index}" onclick="toggleCheckbox(${index})">
        <span class="js-todoText-${index}">${todo}</span>
        <button onclick="deleteTodo(${index})">Delete</button>
      </div>`;
  });
  document.querySelector('.render-todo').innerHTML = render_todos;
}

function toggleCheckbox(index) {
  const checkbox = document.querySelector(`.js-checkbox-${index}`);
  const textTodo = document.querySelector(`.js-todoText-${index}`);
  if (checkbox.checked) {
    textTodo.classList.add('strikethrough');
  } else {
    textTodo.classList.remove('strikethrough');
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodo();
}

function deleteAllTodos() {
  todos = [];
  saveTodos();
  renderTodo();
}

// Attach functions to window object
window.addTodo = addTodo;
window.deleteTodo = deleteTodo;
window.deleteAllTodos = deleteAllTodos;
window.toggleCheckbox = toggleCheckbox;
window.signOutUser = signOutUser;

// Load todos on page load
window.addEventListener('load', loadTodos);
