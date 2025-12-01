// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Product images mapping
const productImages = {
    'Luxurious resin clock': "ai images/watch.jpeg",
    'Pastel nikkah slab': "ai images/nikkah slab.jpeg",
    'Luxurious sea blue bracelet': "ai images/bracelet.jpeg"
};


// Load Cart Items
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Start shopping to add items to your cart</p>
            </div>
        `;
        updatePriceSummary();
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${productImages[item.name] || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 300 300\'%3E%3Crect fill=\'%23d4a5a5\' width=\'300\' height=\'300\'/%3E%3C/svg%3E'}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-artist">Artist: ${item.artist}</p>
                <p class="item-price">PKR ${item.price.toLocaleString()}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>Quantity: ${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">X</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    
    updatePriceSummary();
}

// Increase Quantity
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

// Decrease Quantity
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    } else {
        if (confirm('Remove this item from cart?')) {
            removeItem(index);
        }
    }
}

// Remove Item
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(removedItem.name + ' removed from cart');
    loadCartItems();
    updateCartCount();
}

// Update Price Summary
function updatePriceSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const tax = Math.round(subtotal * 0.015); // 1.5% tax
    const shipping = cart.length > 0 ? 500 : 0;
    const grandTotal = subtotal + tax + shipping;
    
    document.getElementById('subtotal').textContent = 'PKR ' + subtotal.toLocaleString() + '.00';
    document.getElementById('tax').textContent = 'PKR ' + tax.toLocaleString() + '.00';
    document.getElementById('shipping').textContent = 'PKR ' + shipping.toLocaleString() + '.00';
    document.getElementById('grandTotal').textContent = 'PKR ' + grandTotal.toLocaleString() + '.00';
}

// Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Button Event Listeners
document.getElementById('saveLaterBtn').addEventListener('click', function() {
    alert('Cart saved for later! Your items will be waiting for you.');
});

document.getElementById('continueShoppingBtn').addEventListener('click', function() {
    window.location.href = 'products.html';
});

document.getElementById('checkoutBtn').addEventListener('click', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checking out.');
    } else {
        window.location.href = 'checkout.html';
    }
});

// Load cart on page load
window.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartCount();
});

// Make functions global
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem = removeItem;