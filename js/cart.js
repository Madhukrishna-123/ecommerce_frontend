document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    // updateCartCount();
    
  
    if (document.body.classList.contains("cart-page")) {
        // fetchCartProducts(); // Call on cart.html
        loadCart();
    }
});

// Fetch User Details
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
    const productResponse = await fetch(`http://9bf0-45-127-59-91.ngrok-free.app/api/products/${productId}`);
    const product = await productResponse.json();

    try {
        const response = await fetch("http://9bf0-45-127-59-91.ngrok-free.app/api/cart/add", {
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
                quantity:1
            })
        });

        const data = await response.json();
        console.log("Product added to cart:", data);
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}










