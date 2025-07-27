$(document).ready(function () {
    const products = [
        { id: 1, name: "Wireless Headphones", category: "electronics", price: 59.99, image: "images/product1.jpg" },
        { id: 2, name: "Smart Watch", category: "electronics", price: 129.99, image: "images/product2.jpg" },
        { id: 3, name: "Leather Jacket", category: "fashion", price: 199.99, image: "images/product3.jpg" },
        { id: 4, name: "Espresso Machine", category: "home", price: 349.99, image: "images/product4.jpg" },
        { id: 5, name: "Cookbook", category: "books", price: 29.99, image: "images/product5.jpg" },
        { id: 6, name: "Running Shoes", category: "fashion", price: 89.99, image: "images/product6.jpg" },
        { id: 7, name: "Bluetooth Speaker", category: "electronics", price: 45.00, image: "images/product7.jpg" },
        { id: 8, name: "Coffee Table", category: "home", price: 150.00, image: "images/product8.jpg" }
    ];

    function displayResults(results) {
        const container = $('#searchResults');
        container.empty();
        if (results.length === 0) {
            container.append('<p>No products found.</p>');
            return;
        }
        results.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <a href="product-view.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" />
                        <h3>${product.name}</h3>
                        <p>$${product.price.toFixed(2)}</p>
                    </a>
                </div>
            `;
            container.append(productCard);
        });
    }

    $('#searchInput').on('input', function () {
        const query = $(this).val().toLowerCase();
        const filtered = products.filter(product => product.name.toLowerCase().includes(query));
        displayResults(filtered);
    });

    // Initial display of all products
    displayResults(products);
});
