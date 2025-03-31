const API_BASE_URL = "http://localhost:8080/api/users";

function redirectTo(page) {
    window.location.href = page + ".html";
}

// Centralized Error Display
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    } else {
        console.error(`Element with ID '${elementId}' not found.`);
    }
}

// Utility to handle API calls
async function apiCall(endpoint, method, body) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Request failed");

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// ✅ Register User
async function registerUser() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!username || !email || !password) {
        showError('reg-error', "All fields are required!");
        return;
    }

    try {
        const data = await apiCall("register", "POST", { username, email, password });
        alert("Registration successful!");
        redirectTo("login");
    } catch (error) {
        showError('reg-error', error.message);
    }
}

// ✅ Login User - FIXED
async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError('login-error', "Email and Password are required!");
        return;
    }

    try {
        const data = await apiCall("login", "POST", { email, password });
        console.log("Login successful:", data);
        redirectTo("home");
    } catch (error) {
        showError('login-error', error.message);
    }
}

// ✅ Send OTP
async function sendOtp() {
    const email = document.getElementById('forgot-email').value;
    if (!email) {
        showError('forgot-error', "Email is required!");
        return;
    }

    try {
        const data = await apiCall("forgotpassword", "POST", { email });
        document.getElementById("otp-section").style.display = "block";
        alert("OTP sent to your registered email!");
    } catch (error) {
        showError('forgot-error', error.message);
    }
}

// ✅ Reset Password
async function resetPassword() {
    const email = document.getElementById('forgot-email').value;
    const otp = document.getElementById('otp').value;
    const newPassword = document.getElementById('new-password').value;

    if (!email || !otp || !newPassword) {
        showError('forgot-error', "All fields are required!");
        return;
    }

    try {
        const data = await apiCall("resetpassword", "POST", { email, otp, newPassword });
        alert("Password reset successfully!");
        redirectTo("login");
    } catch (error) {
        showError('forgot-error', error.message);
    }
}
