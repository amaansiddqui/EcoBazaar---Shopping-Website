 $(document).ready(function () {
    // Function to get cart from localStorage
    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    // Function to save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    let cartProducts = getCart();

    // Adjust cart product image size via CSS
    $('<style>')
        .prop('type', 'text/css')
        .html('.cart-product-image { width: 30px; height: 30px; object-fit: cover; }')
        .appendTo('head');

    function renderCart() {
        const cartList = $('#cartProductsList');
        cartList.empty();
        let total = 0;

        if (cartProducts.length === 0) {
            cartList.append('<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>');
            $('#totalAmount').text('$0.00');
            return;
        }

        cartProducts.forEach(product => {
            const subtotal = product.price * product.quantity;
            total += subtotal;
            const row = `
                <tr data-id="${product.id}">
                    <td><img src="${product.image}" alt="${product.name}" class="cart-product-image" /></td>
                    <td>${product.name}</td>
                    <td>
                        <div class="input-group quantity-group" style="max-width: 120px;">
                            <button class="btn btn-outline-secondary btn-decrease" type="button">-</button>
                            <input type="number" class="form-control quantity-input" min="0" value="${product.quantity}" />
                            <button class="btn btn-outline-secondary btn-increase" type="button">+</button>
                        </div>
                    </td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td class="subtotal">$${subtotal.toFixed(2)}</td>
                </tr>
            `;
            cartList.append(row);
        });

        $('#totalAmount').text(`$${total.toFixed(2)}`);
    }

    function updateQuantity(productId, newQuantity) {
        if (newQuantity < 0) newQuantity = 0;
        const productIndex = cartProducts.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            if (newQuantity === 0) {
                cartProducts.splice(productIndex, 1);
            } else {
                cartProducts[productIndex].quantity = newQuantity;
            }
            saveCart(cartProducts);
            renderCart();
        }
    }

    $('#cartProductsList').on('change', '.quantity-input', function () {
        const row = $(this).closest('tr');
        const productId = parseInt(row.data('id'));
        let newQuantity = parseInt($(this).val());
        if (isNaN(newQuantity) || newQuantity < 0) {
            newQuantity = 0;
            $(this).val(newQuantity);
        }
        updateQuantity(productId, newQuantity);
    });

    $('#cartProductsList').on('click', '.btn-decrease', function () {
        const row = $(this).closest('tr');
        const productId = parseInt(row.data('id'));
        const input = row.find('.quantity-input');
        let currentQuantity = parseInt(input.val());
        if (isNaN(currentQuantity)) currentQuantity = 0;
        if (currentQuantity > 0) {
            currentQuantity -= 1;
            input.val(currentQuantity);
            updateQuantity(productId, currentQuantity);
        }
    });

    $('#cartProductsList').on('click', '.btn-increase', function () {
        const row = $(this).closest('tr');
        const productId = parseInt(row.data('id'));
        const input = row.find('.quantity-input');
        let currentQuantity = parseInt(input.val());
        if (isNaN(currentQuantity)) currentQuantity = 0;
        currentQuantity += 1;
        input.val(currentQuantity);
        updateQuantity(productId, currentQuantity);
    });

    renderCart();
});
