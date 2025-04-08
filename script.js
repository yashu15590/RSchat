
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTUgK_XkG2WZFj5IvYZebEAICElFmJCl0",
  authDomain: "rschat-3cf87.firebaseapp.com",
  databaseURL: "https://rschat-3cf87-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ Correct region
  projectId: "rschat-3cf87",
  storageBucket: "rschat-3cf87.firebasestorage.app",
  messagingSenderId: "846904503738",
  appId: "1:846904503738:web:ebe3a2cb6d79de7f3f8183",
  measurementId: "G-PF4KETJTYZ"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messagesRef = ref(database, "messages");


const users = {
  "snehujaan": "r",
  "raajujaan": "s"
};



const usernamefield = document.getElementById("username");
const passwordfield = document.getElementById("password");
const loginbutton = document.getElementById("loginButton");

window.addEventListener('DOMContentLoaded', () => {
  usernamefield.focus();
});

usernamefield.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // prevent form submit or default action
    passwordfield.focus(); // move focus
  }
});

passwordfield.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // event.preventDefault(); // Prevent form submission or other default behavior
    loginbutton.click();
  }
});

window.login = function () {
  const username = document.getElementById("username").value.trim();
  // window.loginUser = username;
  localStorage.setItem('loginUser', username);
  const password = document.getElementById("password").value;


  if (users[username] && users[username] === password) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "block";
    window.currentUser = username;
    document.querySelector(".username").textContent = `${password} ✨❤️`;
    const mDiv = document.getElementById("messages");
    mDiv.scrollTop = mDiv.scrollHeight;
    const inputf = document.getElementById('messageInput');
    inputf.focus();

  } else {
    document.getElementById("login-error").style.display = "block";
  }
};

window.sendMessage = function () {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (text && window.currentUser) {
    push(messagesRef, {
      text,
      user: window.currentUser,
      timestamp: Date.now()
    });
    input.value = "";
  }
};

const loginUser = localStorage.getItem('loginUser');

onChildAdded(messagesRef, (data) => {
  
  
  const { text, user } = data.val();
  const messageDiv = document.createElement("div");
  messageDiv.className = "bubble " + (user === loginUser ? "sender" : "receiver");
  messageDiv.textContent = `${user?.charAt(0) || ''} : ${text}`;
  document.getElementById("messages").appendChild(messageDiv);
  const mDiv = document.getElementById("messages");
  mDiv.scrollTop = mDiv.scrollHeight;
  document.getElementById('messageInput').focus();

} ) ;


const inputfield = document.getElementById("messageInput");
const sendbutton = document.getElementById("sendButton");

inputfield.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // event.preventDefault(); // Prevent form submission or other default behavior
    sendbutton.click();
  }
});





