$(document).ready(function () {
    const products = [
        { id: 1, name: "Wireless Headphones", category: "electronics", price: 59.99, image: "https://ts3.mm.bing.net/th?id=OIP.6H3WUWd6k3EmhZs2rwFnvAHaGk&pid=15.1" },
        { id: 2, name: "Smart Watch", category: "electronics", price: 129.99, image: "https://www.leafstudios.in/cdn/shop/files/1_98f0528c-cde8-4599-8b92-fd745efe299f_1024x1024.png?v=1722233325" },
        { id: 3, name: "Leather Jacket", category: "fashion", price: 199.99, image: "https://m.media-amazon.com/images/I/A1ajbBqzLnL._UY1100_.jpg" },
        { id: 4, name: "Espresso Machine", category: "home", price: 349.99, image: "https://www.seattlecoffeegear.com/cdn/shop/collections/e3b24f044edc9f0abe150cc41b07ecf7.png" },
        { id: 5, name: "Cookbook", category: "books", price: 29.99, image: "https://i5.walmartimages.com/asr/6b8115fb-1861-4f70-af5a-edb565893ce9_1.2453928585d7ff4c12980276de633049.jpeg" },
        { id: 6, name: "Running Shoes", category: "fashion", price: 89.99, image: "https://tse2.mm.bing.net/th/id/OIP.3sh2-o-ozj5UJK8tjePLtgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { id: 7, name: "Bluetooth Speaker", category: "electronics", price: 45.00, image: "https://avstore.in/cdn/shop/products/white4_964a08f0-a2ce-46b0-8013-353c08e23e8f.png?v=1615287046" },
        { id: 8, name: "Coffee Table", category: "home", price: 150.00, image: "https://ik.imagekit.io/2xkwa8s1i/img/coffee-tables/praline/1.jpg?tr=w-1200" }
    ];

    function displayProducts(filteredProducts) {
        const productsList = $('#productsList');
        productsList.empty();
        if (filteredProducts.length === 0) {
            productsList.append('<p>No products found.</p>');
            return;
        }
        filteredProducts.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <a href="product-view.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" />
                        <h3>${product.name}</h3>
                        <p>$${product.price.toFixed(2)}</p>
                    </a>
                </div>
            `;
            productsList.append(productCard);
        });
    }

    function filterProducts() {
        const selectedCategory = $('#categoryFilter').val();
        const maxPrice = parseFloat($('#priceRange').val());

        const filtered = products.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            const priceMatch = product.price <= maxPrice;
            return categoryMatch && priceMatch;
        });

        displayProducts(filtered);
        $('#priceValue').text(`$${maxPrice}`);
    }

    $('#categoryFilter').change(filterProducts);
    $('#priceRange').on('input', filterProducts);

    // Initial display
    displayProducts(products);
});
