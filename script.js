// Slider functionality
$(document).ready(function () {
    let currentSlide = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    $('.next').click(function () {
        nextSlide();
    });

    $('.prev').click(function () {
        prevSlide();
    });

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Scroll to Top Button
    const scrollTopBtn = $('#scrollTopBtn');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            scrollTopBtn.fadeIn();
        } else {
            scrollTopBtn.fadeOut();
        }
    });

    scrollTopBtn.click(function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });
});
