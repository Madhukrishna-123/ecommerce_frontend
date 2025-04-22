// // Fetch user details to get user id
// async function fetchUserDetails() {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         console.error("No token found. Please login.");
//         window.location.href = "login.html";
//         return null;
//     }

//     try {
//         const response = await fetch('http://localhost:8080/api/users/userdetails', {
//             method: 'GET',
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error("Failed to fetch user details");
//         }

//         const user = await response.json();
//         console.log("Fetched User Details:", user);
//         return user;
//     } catch (error) {
//         console.error("Error fetching user details:", error);
//         window.location.href = "login.html";
//         return null;
//     }
// }

// // Fetch the user's cart items using their ID
// async function fetchCartItems(userId) {
//     try {
//         const response = await fetch(`http://localhost:8080/api/cart/${userId}`, {
//             method: 'GET',
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error("Failed to fetch cart items");
//         }

       


//         const cartItems = await response.json();
//         console.log("Cart Items:", cartItems);
//         return cartItems;
//     } catch (error) {
//         console.error("Error fetching cart items:", error);
//         return [];
//     }
// }

// // Render cart items to the page
// function renderCartItems(cartItems) {
//     const cartItemsContainer = document.getElementById("cart-items");

//     // If cart is empty, show a message
//     if (cartItems.length === 0) {
//         cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
//         return;
//     }

//     // Get the template and clone it for each cart item
//     const template = document.getElementById("cart-item-template");

//     cartItems.forEach(item => {
//         const itemElement = template.content.cloneNode(true);

//         // Fill the template with the cart item data
//         itemElement.querySelector("img").src = item.imageUrl;
//         itemElement.querySelector("h3").textContent = item.productName;
//         itemElement.querySelector(".price").textContent = item.price;
//         itemElement.querySelector(".quantity").textContent = item.quantity;

//         // Add event listener for removing item from cart
//         const removeButton = itemElement.querySelector(".remove-cart-item");
//         removeButton.addEventListener("click", () => removeItemFromCart(item.productId));

//         // Append the populated item to the container
//         cartItemsContainer.appendChild(itemElement);
//     });
// }

// // Function to remove an item from the cart
// async function removeItemFromCart(productId) {
//     const user = await fetchUserDetails();
//     if (!user) return;

//     try {
//         const response = await fetch(`http://localhost:8080/api/cart/remove?userId=${user.id}&productId=${productId}`, {
//             method: 'DELETE',
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         });

//         if (response.ok) {
//             alert("Item removed from cart");
//             // Re-fetch cart items after removal
//             const cartItems = await fetchCartItems(user.id);
//             renderCartItems(cartItems);
//         } else {
//             throw new Error("Failed to remove item from cart");
//         }
//     } catch (error) {
//         console.error("Error removing item from cart:", error);
//     }
// }



// // Function to clear items from the cart
// async function clearItemsFromCart(userId) {
//     const user = await fetchUserDetails();
//     if (!user) return;

//     try {
//         const response = await fetch(`http://localhost:8080/api/cart//clear/${user.id}`, {
//             method: 'DELETE',
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         });

//         if (response.ok) {
//             alert("Items removed from cart");
//             // Re-fetch cart items after removal
//             const cartItems = await fetchCartItems(user.id);
//             renderCartItems(cartItems);
//         } else {
//             throw new Error("Failed to clear items from cart");
//         }
//     } catch (error) {
//         console.error("Error clearing items from cart:", error);
//     }
// }
// // Load cart when page is loaded
// async function loadCart() {
//     const user = await fetchUserDetails();
//     if (user) {
//         const cartItems = await fetchCartItems(user.id);
//         renderCartItems(cartItems);
//     }
// }

// // Run loadCart on page load
// window.onload = loadCart;




// Function to clear items from the cart
async function clearItemsFromCart() {
    const user = await fetchUserDetails();
    if (!user) return;

    try {
        const response = await fetch(`http://9bf0-45-127-59-91.ngrok-free.app/api/cart/clear/${user.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            alert("Items removed from cart");
            // Re-fetch cart items after removal
            const cartItems = await fetchCartItems(user.id);
            renderCartItems(cartItems);
        } else {
            throw new Error("Failed to clear items from cart");
        }
    } catch (error) {
        console.error("Error clearing items from cart:", error);
    }
}

// Event listener for the clear cart button
document.getElementById("clear-cart-btn").addEventListener("click", clearItemsFromCart);

// Fetch user details to get user id
async function fetchUserDetails() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. Please login.");
        window.location.href = "login.html";
        return null;
    }

    try {
        const response = await fetch('http://9bf0-45-127-59-91.ngrok-free.app/api/users/userdetails', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user details");
        }

        const user = await response.json();
        console.log("Fetched User Details:", user);
        return user;
    } catch (error) {
        console.error("Error fetching user details:", error);
        window.location.href = "login.html";
        return null;
    }
}

// Fetch the user's cart items using their ID
async function fetchCartItems(userId) {
    try {
        const response = await fetch(`http://9bf0-45-127-59-91.ngrok-free.app/api/cart/${userId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch cart items");
        }

        const cartItems = await response.json();
        console.log("Cart Items:", cartItems);
        return cartItems;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return [];
    }
}

// Render cart items to the page
function renderCartItems(cartItems) {
    const cartItemsContainer = document.getElementById("cart-items");

    // If cart is empty, show a message
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // Get the template and clone it for each cart item
    const template = document.getElementById("cart-item-template");

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = template.content.cloneNode(true);

        // Fill the template with the cart item data
        itemElement.querySelector("img").src = item.imageUrl;
        itemElement.querySelector("h3").textContent = item.productName;
        itemElement.querySelector(".price").textContent = item.price;
        itemElement.querySelector(".quantity").textContent = item.quantity;

        // Add event listener for removing item from cart
        const removeButton = itemElement.querySelector(".remove-cart-item");
        removeButton.addEventListener("click", () => removeItemFromCart(item.productId));

        // Append the populated item to the container
        cartItemsContainer.appendChild(itemElement);
    });
}

// Function to remove an item from the cart
async function removeItemFromCart(productId) {
    const user = await fetchUserDetails();
    if (!user) return;

    try {
        const response = await fetch(`http://9bf0-45-127-59-91.ngrok-free.app/api/cart/remove?userId=${user.id}&productId=${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            alert("Item removed from cart");
            // Re-fetch cart items after removal
            const cartItems = await fetchCartItems(user.id);
            renderCartItems(cartItems);
        } else {
            throw new Error("Failed to remove item from cart");
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
    }
}

// Load cart when page is loaded
async function loadCart() {
    const user = await fetchUserDetails();
    if (user) {
        const cartItems = await fetchCartItems(user.id);
        renderCartItems(cartItems);
    }
}

// Run loadCart on page load
window.onload = loadCart;
