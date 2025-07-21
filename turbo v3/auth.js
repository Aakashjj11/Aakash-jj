// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpTRWMUmBmpB0b4S2l7nsYbRi6X7GO3ok",
  authDomain: "bloodlogin-b2343.firebaseapp.com",
  projectId: "bloodlogin-b2343",
  storageBucket: "bloodlogin-b2343.appspot.com",
  messagingSenderId: "322344809469",
  appId: "1:322344809469:web:a171e02328f7b77fea9f94",
  measurementId: "G-S461Q0MDWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Toggle between login and signup forms
window.toggleForm = function(form) {
  document.getElementById("login-form").style.display = (form === "login") ? "block" : "none";
  document.getElementById("signup-form").style.display = (form === "signup") ? "block" : "none";
};

// Password show/hide functionality
document.addEventListener('DOMContentLoaded', function () {
  const pwdInput = document.getElementById('login-password');
  const toggleBtn = document.getElementById('toggle-password');
  if (pwdInput && toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        this.textContent = 'Hide';
      } else {
        pwdInput.type = 'password';
        this.textContent = 'Show';
      }
    });
  }
});

// Helper: Username/email mapping (mock)
async function usernameToEmail(identifier) {
  // If it looks like an email, return as-is
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(identifier)) {
    return identifier;
  }
  // --- MOCK START ---
  // Replace with database query in production!
  if (identifier.toLowerCase() === 'testuser') {
    return 'test@example.com';
  }
  // --- MOCK END ---
  return identifier;
}

// Signup
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;
  const errorDiv = document.getElementById("signup-error");
  errorDiv.textContent = "";

  if (password !== confirm) {
    errorDiv.textContent = "Passwords do not match!";
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    errorDiv.textContent = "Signup Error: " + error.message;
  }
});

// Login (with email or username)
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const identifier = document.getElementById("login-identifier").value.trim();
  const password = document.getElementById("login-password").value;
  const errorDiv = document.getElementById("login-error");
  errorDiv.textContent = "";

  try {
    const email = await usernameToEmail(identifier);
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    errorDiv.textContent = "Login Error: " + error.message;
  }
});

// Google Sign-In (Login)
document.getElementById("google-signin").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (error) {
    document.getElementById("login-error").textContent = "Google Sign-In Error: " + error.message;
  }
});

// Google Sign-Up (Login as signup)
document.getElementById("google-signup").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (error) {
    document.getElementById("signup-error").textContent = "Google Sign-Up Error: " + error.message;
  }
});
