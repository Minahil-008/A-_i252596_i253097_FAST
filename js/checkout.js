// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Edit Address Function
function editAddress() {
    document.getElementById('addressDisplay').style.display = 'none';
    document.getElementById('addressForm').style.display = 'block';
}

// Save Address Function
function saveAddress() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;
    const phone = document.getElementById('phone').value;
    
    // Form validation
    if (!firstName || !lastName || !address || !city || !postalCode || !phone) {
        alert('Please fill in all address fields!');
        return;
    }
    
    // Phone number validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ''))) {
        alert('Please enter a valid phone number!');
        return;
    }
    
    // Update address display
    const fullAddress = `${firstName} ${lastName}, ${address}, ${city} ${postalCode}, Phone: ${phone}`;
    document.getElementById('addressDisplay').innerHTML = `<p>${fullAddress}</p>`;
    
    document.getElementById('addressDisplay').style.display = 'block';
    document.getElementById('addressForm').style.display = 'none';
    
    alert('Address saved successfully!');
}

// Load Order Items
function loadOrderItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p style="text-align: center; color: #6d4c41;">No items in cart</p>';
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item';
        itemDiv.innerHTML = `
            <h4>${item.name}</h4>
            <p class="artist-info">Sold by: ${item.artist}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: PKR ${(item.price * item.quantity).toLocaleString()}</p>
        `;
        orderItemsContainer.appendChild(itemDiv);
    });
    
    updatePriceBreakdown();
}

// Update Price Breakdown
function updatePriceBreakdown() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let productCost = 0;
    cart.forEach(item => {
        productCost += item.price * item.quantity;
    });
    
    const salesTax = Math.round(productCost * 0.015); // 1.5% tax
    const dg = 500; // Delivery charge
    const finalTotal = productCost + salesTax + dg;
    
    document.getElementById('productCost').textContent = 'PKR ' + productCost.toLocaleString() + '.00';
    document.getElementById('salesTax').textContent = 'PKR ' + salesTax.toLocaleString() + '.00';
    document.getElementById('dg').textContent = 'PKR ' + dg.toLocaleString() + '.00';
    document.getElementById('finalTotal').textContent = 'PKR ' + finalTotal.toLocaleString() + '.00';
}

// Confirm Order Button
document.getElementById('confirmOrderBtn').addEventListener('click', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before placing an order.');
        window.location.href = 'products.html';
        return;
    }
    
    // Get selected payment method
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Get address
    const addressDisplay = document.getElementById('addressDisplay').querySelector('p').textContent;
    
    // Validate address is not default
    if (addressDisplay === 'xyz city xyz house street x') {
        alert('Please update your shipping address before confirming the order!');
        editAddress();
        return;
    }
    
    // Calculate total
    let productCost = 0;
    let artistList = [];
    cart.forEach(item => {
        productCost += item.price * item.quantity;
        if (!artistList.includes(item.artist)) {
            artistList.push(item.artist);
        }
    });
    
    const salesTax = Math.round(productCost * 0.015);
    const dg = 500;
    const finalTotal = productCost + salesTax + dg;
    
    // Show order confirmation
    const orderSummary = `
Order Confirmed Successfully!

Payment Method: ${selectedPayment}
Total Amount: PKR ${finalTotal.toLocaleString()}

Items purchased from artists:
${artistList.join(', ')}

Your order will be delivered to:
${addressDisplay}

Thank you for shopping with The Resin Realm!
    `;
    
    alert(orderSummary);
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to home page
    window.location.href = 'index.html';
});

// FAQ Button
document.querySelector('.btn-faq').addEventListener('click', function() {
    alert(`Frequently Asked Questions:

1. What is the delivery time?
   - Standard delivery takes 3-5 business days.

2. Can I cancel my order?
   - Yes, you can cancel within 24 hours of placing the order.

3. What payment methods do you accept?
   - We accept COD, PayPal, Debit Card, and Apple Pay.

4. How do I track my order?
   - You will receive a tracking number via email once your order ships.

5. What is your return policy?
   - Returns accepted within 7 days of delivery for unused items.

For more questions, contact us at resinrealm@gmail.com`);
});

// Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Load page data on load
window.addEventListener('DOMContentLoaded', function() {
    loadOrderItems();
    updateCartCount();
});

// Make functions global
window.editAddress = editAddress;
window.saveAddress = saveAddress;