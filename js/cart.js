document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    // updateCartCount();
    
  
    if (document.body.classList.contains("cart-page")) {
        // fetchCartProducts(); // Call on cart.html
        loadCart();
    }
});

// Fetch Products
// function fetchProducts() {
//     fetch("http://localhost:8080/api/products")
//         .then(response => response.json())
//         .then(products => {
//             const productList = document.getElementById("product-list");
//             const template = document.getElementById("product-template");

//             products.forEach(product => {
//                 const productCard = template.content.cloneNode(true);

//                 productCard.querySelector("img").src = product.imageUrl || "https://via.placeholder.com/200";
//                 productCard.querySelector("h3").textContent = product.name;
//                 productCard.querySelector(".price").textContent = product.price;

//                 productCard.querySelector(".add-cart").addEventListener("click", () => {
//                     addToCart(product.id);
//                 });

//                 productList.appendChild(productCard);
//             });
//         })
//         .catch(error => console.error("Error fetching products:", error));
// }

// Fetch User Details
async function fetchUserDetails() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. Please login.");
        window.location.href = "login.html";
        return null;
    }

    try {
        const response = await fetch('http://localhost:8080/api/users/userdetails', {
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

// // Add to Cart
// async function addToCart(productId) {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         alert("Please login first.");
//         window.location.href = "login.html";
//         return;
//     }

//     const user = await fetchUserDetails();
//     if (!user || !user.id) return;

//     try {
//         const response = await fetch("http://localhost:8080/api/cart/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 userId: user.id,
//                 productId: productId,
//                 // productName:productName,
//                 quantity: 1
//             })
            
//         });

//         const data = await response.json();
//         if (response.ok) {
//             console.log("Product added to cart:", data);
//             updateCartCount();
//         } else {
//             throw new Error(data.message || "Failed to add to cart");
//         }
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//     }
// }

async function addToCart(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. Please login.");
        window.location.href = "login.html";
        return;
    }

    const user = await fetchUserDetails();
    if (!user) {
        console.error("User details not available");
        return;
    }

    // Fetch product details
    const productResponse = await fetch(`http://localhost:8080/api/products/${productId}`);
    const product = await productResponse.json();

    try {
        const response = await fetch("http://localhost:8080/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: user.id,
                productId: productId,
                productName: product.name,
                price: product.price,
                imageUrl:product.imageUrl,
                quantity: 1
            })
        });

        const data = await response.json();
        console.log("Product added to cart:", data);
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}


// // Update Cart Count
// async function updateCartCount() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         document.querySelector(".cart-icon").setAttribute("data-count", "0");
//         return;
//     }

//     const user = await fetchUserDetails();
//     if (!user || !user.id) return;

//     try {
//         const response = await fetch(`http://localhost:8080/api/cart/${user.id}`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error("Failed to fetch cart count");
//         }

//         const count = await response.json();
//         document.querySelector(".cart-icon").setAttribute("data-count", count);
//     } catch (error) {
//         console.error("Error fetching cart count:", error);
//     }
// }

// Fetch Cart Products for Cart Page
// async function fetchCartProducts() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         console.error("No token found. Please login.");
//         window.location.href = "login.html";
//         return;
//     }

//     const user = await fetchUserDetails();
//     if (!user || !user.id) return;

//     try {
//         const response = await fetch(`http://localhost:8080/api/cart/${user.id}`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error("Failed to fetch cart products");
//         }

//         const cartProducts = await response.json();
//         displayCartProducts(cartProducts);
//     } catch (error) {
//         console.error("Error fetching cart products:", error);
//     }
// }

// // Display Cart Products
// function displayCartProducts(products) {
//     const cartList = document.getElementById("cart-list");
//     cartList.innerHTML = ""; // Clear existing content

//     if (products.length === 0) {
//         cartList.innerHTML = "<p>Your cart is empty.</p>";
//         return;
//     }

//     products.forEach(product => {
//         const item = document.createElement("div");
//         item.classList.add("cart-item");

//         item.innerHTML = `
//             <img src="${product.imageUrl || 'https://via.placeholder.com/200'}" alt="${product.name}">
//             <div>
//                 <h3>${product.name}</h3>
//                 <p>Price: ${product.price}</p>
//                 <p>Quantity: ${product.quantity}</p>
//             </div>
//         `;

//         cartList.appendChild(item);
//     });
// }




// Function to Load Cart on Cart Icon Click
async function loadCart() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. Please login.");
        window.location.href = "login.html";
        return;
    }

    // Fetch user details to get userId
    const user = await fetchUserDetails();
    if (!user || !(user.id || user.userId)) {
        console.error("User details not available");
        window.location.href = "login.html";
        return;
    }

    const userId = user.id || user.userId;

    try {
        console.log("USERRRRRRR" + userId);
        
        const response = await fetch(`http://localhost:8080/api/cart/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch cart items");
        }

        const cartItems = await response.json();
        console.log("Cart Items:", cartItems);

        // Redirect to cart page after fetching
        window.location.href = "cart.html";
    } catch (error) {
        console.error("Error loading cart:", error);
    }
}

