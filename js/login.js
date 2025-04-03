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