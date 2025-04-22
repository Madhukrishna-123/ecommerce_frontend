const API_BASE_URL = "http://localhost:8080/api/users"; // Adjust base URL if needed

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
            body: JSON.stringify(body),
        });

        // Check Content-Type to determine response format
        const contentType = response.headers.get("content-type");
        let data;

        // Read response based on content type
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text(); // For plain text responses
        }

        // Handle error status
        if (!response.ok) throw new Error(data.message || data || "Request failed");

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// // ✅ Login User
// async function loginUser() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     if (!email || !password) {
//         showError('login-error', "Email and Password are required!");
//         return;
//     }

//     try {
//         const data = await apiCall("login", "POST", { email, password });
        
//         // Assuming the token is in data.token and user info is in data.user
//         const token = data.token;
        
//         if (token) {
//             console.log("Login successful! Token:", token);
//             // Optionally, store the token in localStorage
//             localStorage.setItem("token", token);
            
//             // Fetch and display the user's details
//             displayUserDetails(data.user, token);
//         } else {
//             console.error("Token not found in response.");
//         }

//         redirectTo("t");
//     } catch (error) {
//         showError('login-error', error.message); // Show error on the page
//     }
// }
// ✅ Login User
async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError('login-error', "Email and Password are required!");
        return;
    }

    try {
        const data = await apiCall("login", "POST", { email, password });

        // Print email, password, token, and user data in the console
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Token:", data.token);
        console.log("User Data:", data.user);  // User data in JSON format
        
        // Assuming the token is in data.token and user info is in data.user
        const token = data.token;
        
        if (token) {
            console.log("Login successful! Token:", token);

            // Store the token and user data in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(data.user));  // Save user data
            
            // Redirect to t.html to display user details
            redirectTo("home");  // Redirecting to t.html
        } else {
            console.error("Token not found in response.");
        }
    } catch (error) {
        showError('login-error', error.message); // Show error on the page
    }
}



// Redirect function
function redirectTo(page) {
    window.location.href = page + ".html";
}

// Fetch User Details based on the token
function displayUserDetails(user, token) {
    // Display user details in the interface
    document.getElementById('username').innerText = user.username;
    document.getElementById('email-address').innerText = user.email;
    document.getElementById('user-token').innerText = token;

    // Make the user details section visible
    document.getElementById('user-details').style.display = 'block';
}
