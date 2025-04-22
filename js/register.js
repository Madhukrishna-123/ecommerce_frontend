const API_BASE_URL = "http://localhost:8080/api/users";
// const API_BASE_URL = "http://192.168.1.9:8080/api/users";

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

async function registerUser() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const firstName = document.getElementById('reg-firstName').value;
    const secondName = document.getElementById('reg-secondName').value;
    const password = document.getElementById('reg-password').value;

    if (!username || !email || !password ||!secondName ||!firstName) {
        showError('reg-error', "All fields are required!");
        return;
    }

    try {
        const data = await apiCall("register", "POST", { username, email, password ,firstName,secondName});
        alert("Registration successful!");
        redirectTo("login");
    } catch (error) {
        showError('reg-error', error.message);
    }
}