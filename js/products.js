// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Artist Filter
document.getElementById('artistFilter').addEventListener('change', function() {
    const selectedArtist = this.value;
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(product => {
        if (selectedArtist === 'all' || product.dataset.artist === selectedArtist) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// Sort Filter
document.getElementById('sortFilter').addEventListener('change', function() {
    const sortValue = this.value;
    const productsGrid = document.getElementById('productsGrid');
    const products = Array.from(document.querySelectorAll('.product-item'));
    
    if (sortValue === 'price-low') {
        products.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
    } else if (sortValue === 'price-high') {
        products.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
    } else if (sortValue === 'popularity') {
        // Shuffle for demo purposes
        products.sort(() => Math.random() - 0.5);
    }
    
    // Re-append sorted products
    products.forEach(product => productsGrid.appendChild(product));
});

// Add to Cart Functionality
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.dataset.name;
        const productPrice = this.dataset.price;
        const artistName = this.dataset.artist;
        
        // Get existing cart from localStorage or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingProduct = cart.find(item => item.name === productName);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: parseInt(productPrice),
                artist: artistName,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        let cartCount = document.querySelector('.cart-count');
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        alert(productName + ' added to cart!');
    });
});

// Load cart count on page load
window.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
});

// Search Functionality
document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let searchTerm = this.value.toLowerCase();
        if (searchTerm.trim() !== '') {
            const products = document.querySelectorAll('.product-item');
            let found = false;
            
            products.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    product.style.display = 'block';
                    found = true;
                } else {
                    product.style.display = 'none';
                }
            });
            
            if (!found) {
                alert('No products found matching "' + searchTerm + '"');
                products.forEach(product => product.style.display = 'block');
            }
        }
    }
});