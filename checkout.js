$(document).ready(function () {
    // Sample order summary data (could be loaded from cart or backend)
    const orderItems = [
        { id: 1, name: "Wireless Headphones", quantity: 1, price: 59.99 },
        { id: 3, name: "Leather Jacket", quantity: 2, price: 199.99 }
    ];

    function displayOrderSummary() {
        const orderSummaryList = $('#orderSummaryList');
        orderSummaryList.empty();
        let total = 0;
        orderItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            orderSummaryList.append(`<li>${item.name} x ${item.quantity} - $${subtotal.toFixed(2)}</li>`);
        });
        $('#orderTotal').text(`$${total.toFixed(2)}`);
    }

    displayOrderSummary();

    // Form validation and submission
    $('#shippingForm').submit(function (e) {
        e.preventDefault();
        let isValid = true;

        $('#shippingForm input[required]').each(function () {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }
        });

        if (isValid) {
            alert('Order placed successfully!');
            // Redirect to order confirmation page or clear form
            window.location.href = 'order-confirmation.html';
        } else {
            alert('Please fill in all required fields.');
        }
    });
});
