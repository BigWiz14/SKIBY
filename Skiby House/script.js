document.addEventListener("DOMContentLoaded",  () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const cartIcon = document.getElementById('cart-icon');
    const cartItemsContainer = document.getElementById('cartItems');
    const checkoutBtn = document.querySelector('checkoutBtn');
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
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", checkoutClicked);
    } else {
        console.error("Checkout button not found!"
            
        );
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

