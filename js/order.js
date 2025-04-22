document.addEventListener("DOMContentLoaded", async () => {
    const ordersContainer = document.getElementById("orders-container");

    try {
        const user = await fetchUserDetails();

        if (!user || !user.id) {
            throw new Error("User not logged in");
        }

        const userId = user.id;
        console.log("📌 User ID (Orders):", userId);

        const ordersResponse = await fetch(`http://9bf0-45-127-59-91.ngrok-free.app/api/orders/user/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!ordersResponse.ok) {
            throw new Error("Failed to fetch orders");
        }

        const orders = await ordersResponse.json();
        console.log("📦 Orders fetched:", orders);

        if (orders.length === 0) {
            ordersContainer.innerHTML = "<p class='text-muted'>You have no orders yet.</p>";
            return;
        }

        for (const order of orders) {
            const orderTemplate = document.getElementById("order-template").content.cloneNode(true);

            orderTemplate.querySelector(".order-id").textContent = order.id;
            orderTemplate.querySelector(".order-status").textContent = order.status || "Processing";
            orderTemplate.querySelector(".order-total").textContent = order.total || "0.00";
            orderTemplate.querySelector(".order-date").textContent = new Date(order.date || Date.now()).toLocaleDateString();

            const productContainer = orderTemplate.querySelector(".products");

            for (const productId of order.productIds || []) {
                try {
                    const productRes = await fetch(`http://9bf0-45-127-59-91.ngrok-free.app/api/products/${productId}`);
                    if (!productRes.ok) throw new Error("Product not found");
                    const product = await productRes.json();

                    const productTemplate = document.getElementById("order-product-template").content.cloneNode(true);

                    productTemplate.querySelector("img").src = product.imageUrl || "https://via.placeholder.com/100";
                    productTemplate.querySelector(".product-name").textContent = product.name;
                    productTemplate.querySelector(".product-category").textContent = `Category: ${product.category}`;
                    productTemplate.querySelector(".product-price").textContent = product.price;
                    productTemplate.querySelector(".product-description").textContent = product.description;

                    productContainer.appendChild(productTemplate);
                } catch (err) {
                    console.error(`❌ Failed to fetch product ${productId}:`, err);
                }
            }

            ordersContainer.appendChild(orderTemplate);
        }

    } catch (error) {
        console.error("❌ Error loading orders:", error.message);
        ordersContainer.innerHTML = "<p class='text-danger'>Please login to view your orders.</p>";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
});

// ✅ User Details Function (Same as cart.js working one)
async function fetchUserDetails() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("❌ No token found in localStorage");
        throw new Error("Token not found");
    }

    try {
        const response = await fetch('http://9bf0-45-127-59-91.ngrok-free.app/api/users/userdetails', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ UserDetails fetch failed. Response:", errorText);
            throw new Error("Failed to fetch user details");
        }

        const user = await response.json();
        console.log("✅ Fetched User:", user);
        return user;
    } catch (error) {
        console.error("🔥 Error in fetchUserDetails:", error);
        throw error;
    }
}
