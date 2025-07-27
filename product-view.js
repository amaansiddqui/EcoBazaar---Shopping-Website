$(document).ready(function () {
    // Parse product id from URL
    function getProductIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    // Sample products data (should be consistent with products.js)
    const products = [
        { id: 1, name: "Wireless Headphones", description: "High quality wireless headphones with noise cancellation and long battery life.", price: 59.99, image: "https://ts3.mm.bing.net/th?id=OIP.6H3WUWd6k3EmhZs2rwFnvAHaGk&pid=15.1" },
        { id: 2, name: "Smart Watch", description: "Stylish smart watch with fitness tracking and customizable watch faces.", price: 129.99, image: "https://www.leafstudios.in/cdn/shop/files/1_98f0528c-cde8-4599-8b92-fd745efe299f_1024x1024.png?v=1722233325" },
        { id: 3, name: "Leather Jacket", description: "Premium leather jacket with a classic design.", price: 199.99, image: "https://m.media-amazon.com/images/I/A1ajbBqzLnL._UY1100_.jpg" },
        { id: 4, name: "Espresso Machine", description: "Breville Barista Express Espresso Machine", price: 299.99, image: "https://www.seattlecoffeegear.com/cdn/shop/collections/e3b24f044edc9f0abe150cc41b07ecf7.png" },
        { id: 5, name: "CookBook", description: "The Complete Cookbook for Young Chefs", price: 24.99, image: "https://i5.walmartimages.com/asr/6b8115fb-1861-4f70-af5a-edb565893ce9_1.2453928585d7ff4c12980276de633049.jpeg" }, 
        { id: 6, name: "Running Shoes", description: "Lightweight running shoes with excellent grip and comfort.", price: 89.99, image: "https://tse2.mm.bing.net/th/id/OIP.3sh2-o-ozj5UJK8tjePLtgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { id: 7, name: "Bluetooth Speaker", description: "Portable Bluetooth speaker with deep bass and clear sound.", price: 49.99, image: "https://avstore.in/cdn/shop/products/white4_964a08f0-a2ce-46b0-8013-353c08e23e8f.png?v=1615287046" },
     // Adjust product image URLs for consistency
    ];
        
  

    // Load product details based on id
    function loadProductDetails(productId) {
        const product = products.find(p => p.id == productId);
        if (!product) {
            $('#productTitle').text('Product Not Found');
            return;
        }
        $('#productTitle').text(product.name);
        $('#productDescription').text(product.description);
        $('#productPrice').text(`$${product.price.toFixed(2)}`);
        $('#productImage').attr('src', product.image);
        $('#productImage').attr('alt', product.name);
        $('#productThumbnail').attr('src', product.image);
    }


    // Related products feature restored as per user feedback
    const relatedProducts = [
        { id: 2, name: "Smart Watch", price: 129.99, image: "https://www.leafstudios.in/cdn/shop/files/1_98f0528c-cde8-4599-8b92-fd745efe299f_1024x1024.png?v=1722233325" },
        { id: 4, name: "Espresso Machine", price: 299.99, image: "https://www.seattlecoffeegear.com/cdn/shop/collections/e3b24f044edc9f0abe150cc41b07ecf7.png" },
        { id: 5, name: "CookBook", price: 24.99, image: "https://i5.walmartimages.com/asr/6b8115fb-1861-4f70-af5a-edb565893ce9_1.2453928585d7ff4c12980276de633049.jpeg" },
        { id: 7, name: "Bluetooth Speaker", price: 49.99, image: "https://avstore.in/cdn/shop/products/white4_964a08f0-a2ce-46b0-8013-353c08e23e8f.png?v=1615287046" },
        { id: 1, name: "Wireless Headphones", price: 59.99, image: "https://ts3.mm.bing.net/th?id=OIP.6H3WUWd6k3EmhZs2rwFnvAHaGk&pid=15.1" },
        { id: 3, name: "Leather Jacket", price: 199.99, image: "https://m.media-amazon.com/images/I/A1ajbBqzLnL._UY1100_.jpg" },
        { id: 6, name: "Running Shoes", price: 89.99, image: "https://tse2.mm.bing.net/th/id/OIP.3sh2-o-ozj5UJK8tjePLtgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" }
    ];

    function displayRelatedProducts() {
        const container = $('#relatedProducts');
        container.empty();
        relatedProducts.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
            `;
            container.append(productCard);
        });
    }

    displayRelatedProducts();

    // Function to get cart from localStorage
    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }



    // Function to save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Add to Cart button click handler
    $('#addToCartBtn').click(function () {
        // Get current product details from the page
        const product = {
            id: getProductIdFromUrl() || 1,
            name: $('#productTitle').text() || 'Product',
            price: parseFloat($('#productPrice').text().replace('$', '')) || 0,
            image: $('#productImage').attr('src') || ''
        };

        // Get existing cart
        let cart = getCart();

        // Check if product already in cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            // Increase quantity if product exists
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add new product with quantity 1
            product.quantity = 1;
            cart.push(product);
        }

        // Save updated cart
        saveCart(cart);

        alert('Product added to cart!');
    });

    // Review functionality
    function getReviews() {
        const productId = getProductIdFromUrl();
        const reviews = localStorage.getItem(`reviews_${productId}`);
        return reviews ? JSON.parse(reviews) : [];
    }

    function saveReview(review) {
        const productId = getProductIdFromUrl();
        const reviews = getReviews();
        reviews.push(review);
        localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
    }

    function displayReviews() {
        const reviews = getReviews();
        const container = $('#reviewsContainer');
        container.empty();
        if (reviews.length === 0) {
            container.append('<p>No reviews yet.</p>');
            return;
        }
        reviews.forEach(review => {
            const reviewHtml = `
                <div class="review">
                    <strong>${review.name}</strong> - <em>${review.date}</em>
                    <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                    <p>${review.comment}</p>
                </div>
            `;
            container.append(reviewHtml);
        });
    }

    $('#reviewForm').submit(function (e) {
        e.preventDefault();
        const name = $('#reviewerName').val();
        const rating = parseInt($('#reviewRating').val());
        const comment = $('#reviewComment').val();
        const date = new Date().toLocaleDateString();

        if (!name || !rating || !comment) {
            alert('Please fill in all review fields.');
            return;
        }

        const review = { name, rating, comment, date };
        saveReview(review);
        displayReviews();

        // Clear form
        $('#reviewerName').val('');
        $('#reviewRating').val('');
        $('#reviewComment').val('');
    });

    // Initialize page
    const productId = getProductIdFromUrl();
    loadProductDetails(productId);
    displayReviews();
});
