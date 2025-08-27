// Load users from localStorage or fallback to default
let users = JSON.parse(localStorage.getItem("users")) || [
    { username: "admin", password: "1234", balance: 1000 }
];

// Save users back to localStorage
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Handle signup
function signup(event) {
    event.preventDefault();

    let username = document.getElementById("signup-username").value.trim();
    let password = document.getElementById("signup-password").value.trim();
    let deposit = parseFloat(document.getElementById("signup-deposit").value);

    if (!username || !password || isNaN(deposit) || deposit <= 0) {
    alert("Please fill all fields with valid values");
    return;
    }

  // Check if user already exists
    let exists = users.some(u => u.username === username);
    if (exists) {
    alert("User already exists!");
    return;
    }

  // Add new user with initial balance
    users.push({ username, password, balance: deposit });
    saveUsers();

    alert(`Signup successful! Initial deposit: $${deposit}`);
    window.location.href = "login.html";
}

// Handle login
function login(event) {
    event.preventDefault();

    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value.trim();

    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
    alert("Login successful!");

    // Save current logged-in user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "dashboard.html";
    } else {
    alert("Invalid username or password!");
    }
}
