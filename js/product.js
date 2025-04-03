document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
    // updateCartCount();
    
});

// Fetch Products and Render
function fetchProducts() {
    fetch("http://localhost:8080/api/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            const template = document.getElementById("product-template");

            products.forEach(product => {
                const productCard = template.content.cloneNode(true);

                productCard.querySelector("img").src = product.imageUrl || "https://via.placeholder.com/200";
                productCard.querySelector("img").alt = product.name;
                productCard.querySelector("h3").textContent = product.name;
                productCard.querySelector(".category").textContent = product.category;
                productCard.querySelector(".price").textContent = product.price;

                // Add to Cart button click
                productCard.querySelector(".add-cart").addEventListener("click", () => {
                    addToCart(product.id);
                });

                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
}
