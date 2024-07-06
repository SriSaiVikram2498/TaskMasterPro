import { auth } from "../shared/firebase-config.js";
import { signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Check if a user is logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is logged in:', user);
    // Show main project content
    renderTodo();
  } else {
    console.log('No user is logged in');
    // Redirect to login page
    window.location.href = "../user-auth/index.html";
  }
});

let todos = JSON.parse(localStorage.getItem('todos'));
if (!todos) {
  todos = [];
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
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
        <input type="checkbox" class="todo-checkbox js-checkbox-${index}" onclick="toggleCheckbox(${index})" >
        <span class="js-todoText-${index}"> ${todo} </span>
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

function signOut() {
  firebaseSignOut(auth).then(() => {
    console.log('User signed out');
    window.location.href = "../user-auth/index.html";
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
}

window.addEventListener('load', renderTodo);
window.addTodo = addTodo;
window.deleteTodo = deleteTodo;
window.deleteAllTodos = deleteAllTodos;
window.toggleCheckbox = toggleCheckbox;
window.signOut = signOut;
