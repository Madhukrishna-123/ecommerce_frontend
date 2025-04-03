document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem("token");

    console.log("Stored token:", token);

    if (token) {
        // Fetch user details from the server
        fetch('http://localhost:8080/api/users/userdetails', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch user details.");
            }
            return response.json(); // Parse the JSON response
        })
        .then(user => {
            // Log the details to the console
            console.log("User Data:", user);

            // Update the page with user details
            document.getElementById('username').innerText = user.username;
            document.getElementById('first-name').innerText = user.firstName;
            document.getElementById('second-name').innerText = user.secondName;
            document.getElementById('email-address').innerText = user.email;
            document.getElementById('user-token').innerText = token;

            // Show user details section
            document.getElementById('user-details').style.display = 'block';
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an issue loading your user data.");
        });
    } else {
        console.log("No token found, redirecting to login.");
        window.location.href = "login.html";  // Redirect to login page if no token
    }
});
