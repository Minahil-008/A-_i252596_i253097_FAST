// Join as Artist Button
document.getElementById('joinArtistBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Artist registrations are currently unavailable in this demo model.');
});

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Add to Cart Buttons
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        let cartCount = document.querySelector('.cart-count');
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
        
        alert('Product added to cart!');
    });
});

// Search Functionality
document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let searchTerm = this.value;
        if (searchTerm.trim() !== '') {
            window.location.href = 'products.html?search=' + encodeURIComponent(searchTerm);
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});