$(document).ready(function () {
    $('#contactForm').submit(function (e) {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        $('#contactForm input, #contactForm textarea').removeClass('input-error');

        // Validate Name
        const name = $('#name').val().trim();
        if (name === '') {
            isValid = false;
            $('#name').addClass('input-error');
        }

        // Validate Email
        const email = $('#email').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailPattern.test(email)) {
            isValid = false;
            $('#email').addClass('input-error');
        }

        // Validate Message
        const message = $('#message').val().trim();
        if (message === '') {
            isValid = false;
            $('#message').addClass('input-error');
        }

        if (isValid) {
            alert('Thank you for contacting us! We will get back to you shortly.');
            $('#contactForm')[0].reset();
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
});
