// Load current logged-in user
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

if (!currentUser) {
  alert("You must log in first!");
  window.location.href = "login.html";
}

// Initialize balance from logged in user
let balance = currentUser.balance || 0;
let transactions = [];

// Update user balance in localStorage
function updateUserBalance() {
  if (!currentUser) return;

  currentUser.balance = balance;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  let index = users.findIndex(u => u.username === currentUser.username);
  if (index !== -1) {
    users[index].balance = balance;
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Update transaction history on the UI
function updateHistory(action, amount) {
  let historyList = document.getElementById("history");
  let now = new Date().toLocaleString();
  let entry = document.createElement("li");
  entry.textContent = `${now} - ${action}: $${amount}`;
  historyList.prepend(entry); // newest first
}

// Deposit
function deposit() {
  let amountInput = document.getElementById("amount");
  let amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid deposit amount!");
    return;
  }

  balance += amount;
  updateUserBalance();
  document.getElementById("balance").textContent = `Balance: $${balance}`;
  updateHistory("Deposit", amount);

  amountInput.value = ""; // clear entry
}

// Withdraw
function withdraw() {
  let amountInput = document.getElementById("amount");
  let amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid withdrawal amount!");
    return;
  }

  if (amount > balance) {
    alert("Insufficient balance!");
    return;
  }

  balance -= amount;
  updateUserBalance();
  document.getElementById("balance").textContent = `Balance: $${balance}`;
  updateHistory("Withdraw", amount);

  amountInput.value = ""; // clear entry
}

// Check balance (popup)
function checkBalance() {
  document.getElementById("popupTitle").textContent = "Account Balance";
  document.getElementById("popupBalance").textContent = `Your balance is $${balance}`;
  document.getElementById("balancePopup").style.display = "flex";

  updateHistory("Checked Balance", balance);
}

// Close popup
function closePopup() {
  document.getElementById("balancePopup").style.display = "none";
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
