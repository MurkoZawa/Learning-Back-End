const apiUrl = 'http://localhost:3000/api';

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };
}

// ========== LOGOUT / NAVBAR ==========
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem("token");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginLink = document.getElementById("loginLink");

    if (token) {
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        if (loginLink) loginLink.style.display = "none";
    } else {
        if (logoutBtn) logoutBtn.style.display = "none";
        if (loginLink) loginLink.style.display = "inline-block";
    }

    if (!token && window.location.pathname !== "/login.html" && window.location.pathname !== "/index.html" && window.location.pathname !== "/about.html") {
        window.location.href = "login.html";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem("token");
            window.location.href = "login.html";
        });
    }
});

// ========== LOGIN ==========
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('logUsername').value;
        const password = document.getElementById('logPassword').value;
        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.success && data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = "index.html";
        } else alert(data.message);
    });
}

// ========== REGISTER ==========
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const res = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        alert(data.message);
        if (data.success) registerForm.reset();
    });
}

// ========== TASKS ==========
const taskForm = document.getElementById('taskForm');
if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('taskName').value;
        const description = document.getElementById('taskDescription').value;
        await fetch(`${apiUrl}/tasks`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ name, description }) });
        loadTasks();
        taskForm.reset();
    });

    async function loadTasks() {
        const res = await fetch(`${apiUrl}/tasks`, { headers: getAuthHeaders() });
        const tasks = await res.json();
        const list = document.getElementById('taskList');
        list.innerHTML = '';
        tasks.forEach(t => list.innerHTML += `<div class="card"><h4>${t.name}</h4><p>${t.description}</p></div>`);
    }
    loadTasks();
}

// ========== REVIEWS ==========
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewName').value;
        const text = document.getElementById('reviewText').value;
        await fetch(`${apiUrl}/reviews`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ name, text }) });
        loadReviews();
        reviewForm.reset();
    });

    async function loadReviews() {
        const res = await fetch(`${apiUrl}/reviews`, { headers: getAuthHeaders() });
        const reviews = await res.json();
        const list = document.getElementById('reviewsList');
        list.innerHTML = '';
        reviews.forEach(r => list.innerHTML += `<div class="card"><h4>${r.name}</h4><p>${r.text}</p></div>`);
    }
    loadReviews();
}
