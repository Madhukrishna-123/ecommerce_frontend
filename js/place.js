document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", async function (event) {
        if (event.target.classList.contains("buy-now")) {
            const productCard = event.target.closest(".product-card");
            await placeOrderFromCard(productCard);
        }
    });
});

async function placeOrderFromCard(productCard) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Token missing. Please login!");
        return;
    }

    // ✅ Step 1: Fetch user details
    let userId;
    try {
        const userRes = await fetch('http://localhost:8080/api/users/userdetails', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!userRes.ok) {
            throw new Error("Failed to fetch user details");
        }

        const userData = await userRes.json();
        userId = userData.id;
        console.log("✅ Fetched User ID:", userId);
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        alert("Failed to fetch user from token.");
        return;
    }

    // ✅ Step 2: Get Product ID from the clicked card
    const productId = productCard.querySelector('.product-id')?.textContent.trim();

    if (!productId) {
        alert("Product ID not found.");
        return;
    }

    // ✅ Step 3: Fetch Product Details
    let product;
    try {
        const productRes = await fetch(`http://localhost:8080/api/products/${productId}`);
        if (!productRes.ok) {
            throw new Error("Failed to fetch product details");
        }
        product = await productRes.json();
        console.log("🛒 Product being ordered:", product);
    } catch (error) {
        console.error("❌ Product fetch error:", error);
        alert("Failed to fetch product info.");
        return;
    }

    // ✅ Step 4: Construct the order
    const order = {
        userId: userId,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        orderDate: new Date().toISOString()
    };
    console.log("📦 Order to place:", order);

    // ✅ Step 5: Place the order
    try {
        const orderRes = await fetch('http://localhost:8080/api/orders/place', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (orderRes.ok) {
            const placedOrder = await orderRes.json();
            console.log("✅ Order Placed Successfully:", placedOrder);
            alert(`Order placed successfully! Order ID: ${placedOrder.orderId}`);
            window.location.href = 'place.html';
        } else {
            const errorText = await orderRes.text();
            console.error("Order failed:", errorText);
            alert("Failed to place order. Try again.");
        }
    } catch (error) {
        console.error("🚨 Error placing order:", error);
        alert("Something went wrong. Try again.");
    }
}
