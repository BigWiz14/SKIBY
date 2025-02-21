document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const cartIcon = document.getElementById('cart-icon');
    const cartItemsContainer = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const totalPriceDisplay = document.getElementById('totalPrice');

    const cartItems = [];
    let totalPrice = 0;

    function addToCartClicked(event) {
        event.preventDefault();
        const item = {
            name: event.target.dataset.item,
            price: parseFloat(event.target.dataset.price) // Parse price to float
        };
        cartItems.push(item);
        totalPrice += item.price; // Update total price
        updateCart();
    }

    function updateCart() {
        cartIcon.innerHTML = `${cartItems.length}`;

        cartItemsContainer.innerHTML = ''; // Clear previous items
    
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cartItems.forEach(item => {
                const listItem = document.createElement('div');
                listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`; // Display item name and price
                cartItemsContainer.appendChild(listItem);
            });
        }

        totalPriceDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`; // Update total price display
    }

    function checkoutClicked() {
        // Replace this with your actual checkout logic
        alert('Checkout clicked! Implement your checkout logic here.');
    }

    addToCartButtons.forEach(button => {
        button.removeEventListener("click", addToCartClicked); // Remove existing event listener if any
        button.addEventListener("click", addToCartClicked);
    });

    cartIcon.removeEventListener('click', showCartModal); // Remove existing event listener if any
    cartIcon.addEventListener('click', showCartModal);

    function showCartModal() {
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'), {
            keyboard: false
        });
        cartModal.show();
    }

});
// Example: Node.js backend (using the `stripe` npm package)

const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_STRIPE_KEY'); // Your secret key from Stripe

const app = express();
app.use(express.json());

app.post('/charge', async (req, res) => {
  const { token } = req.body; // Get the token from frontend
  try {
    // Create a charge using the token
    const charge = await stripe.charges.create({
      amount: 5000, // The amount in cents (e.g., $50.00)
      currency: 'usd',
      source: token, // The token received from the frontend
      description: 'Test Payment',
    });
    res.status(200).send({ success: true, charge });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
