



// document.addEventListener('DOMContentLoaded', () => {
//     const menuToggle = document.getElementById('menu-toggle');
//     const sidebar = document.getElementById('sidebar');
//     const closeBtn = document.getElementById('close-btn');
//     const accountButton = document.getElementById('account-button');
//     const accountMenu = document.getElementById('account-menu');
//     const userGreeting = document.getElementById('user-greeting');
//     const profilePic = document.getElementById('profile-pic');
//     const accountName = document.getElementById('account-name');
//     const logoutBtn = document.getElementById('logout-btn'); 
//     const body = document.body;

//     // Toggle Sidebar
//     menuToggle.addEventListener('click', () => {
//         sidebar.classList.toggle('active');
//         document.body.classList.toggle('sidebar-active');
//     });

//     // Close Sidebar
//     closeBtn.addEventListener('click', () => {
//         sidebar.classList.remove('active');
//         document.body.classList.remove('sidebar-active');
//     });

//     // Toggle Account Menu
//     accountButton.addEventListener('click', () => {
//         accountMenu.classList.toggle('active');
//     });

//     // Fetch user details using token
//     const token = localStorage.getItem("token");
//     if (token) {
//         fetch('http://localhost:8080/api/users/userdetails', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         .then(response => response.json())
//         .then(user => {
//             userGreeting.innerText = `Hello, ${user.firstName}`;
//             const firstLetter = user.firstName.charAt(0).toUpperCase();
//             const lastLetter = user.secondName.charAt(0).toUpperCase();
//             profilePic.innerText = firstLetter + lastLetter;
//             accountName.innerText = `${user.firstName} ${user.secondName}`;
//         })
//         .catch(error => console.error('Error fetching user details:', error));
//     } else {
//         window.location.href = 'login.html';
//     }

//     // Logout
//     logoutBtn.addEventListener('click', () => {
//         if (token) {
//             fetch('http://localhost:8080/api/users/logout', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//             .then(response => {
//                 if (response.ok) {
//                     localStorage.removeItem("token");
//                     window.location.href = 'index.html';
//                 } else {
//                     console.error('Logout failed');
//                 }
//             })
//             .catch(error => console.error('Error logging out:', error));
//         } else {
//             console.error('No token found');
//         }
//     });
// });



document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const accountButton = document.getElementById('account-button');
    const accountMenu = document.getElementById('account-menu');
    const userGreeting = document.getElementById('user-greeting');
    const profilePic = document.getElementById('profile-pic');
    const accountName = document.getElementById('account-name');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Toggle Sidebar
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-active');
    });

    // Close Sidebar
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-active');
    });

    // Toggle Account Menu
    accountButton.addEventListener('click', () => {
        accountMenu.classList.toggle('active');
    });

    // ✅ Token Validation
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // ✅ Fetch User Details
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
        const userId = payload.userId; // Adjust based on your token structure

        fetch('http://9bf0-45-127-59-91.ngrok-free.app/api/users/userdetails', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 403) throw new Error("Unauthorized");
            return response.json();
        })
        .then(user => {
            userGreeting.innerText = `Hello, ${user.firstName}`;
            const firstLetter = user.firstName.charAt(0).toUpperCase();
            const lastLetter = user.secondName.charAt(0).toUpperCase();
            profilePic.innerText = firstLetter + lastLetter;
            accountName.innerText = `${user.firstName} ${user.secondName}`;
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = 'login.html';
        });
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        window.location.href = 'login.html';
    }

    // ✅ Logout Functionality
    logoutBtn.addEventListener('click', () => {
        fetch('http://9bf0-45-127-59-91.ngrok-free.app/api/users/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem("token");
                window.location.href = 'index.html';
            } else {
                throw new Error("Logout failed");
            }
        })
        .catch(error => {
            console.error("Error logging out:", error);
            localStorage.removeItem("token");
            window.location.href = 'index.html';
        });
    });
});
