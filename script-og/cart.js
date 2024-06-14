document.addEventListener('DOMContentLoaded', function() {
    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let cartTotal = 0;

    function updateCartTotal() {
        cartTotal = purchasedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
    }

    function removeItem(index) {
        purchasedItems.splice(index, 1);
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
        renderCartItems();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        purchasedItems.forEach((item, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Image"><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td data-label="Name">${item.name}</td>
                <td data-label="Category">${item.category}</td>
                <td data-label="Price">$${item.price.toFixed(2)}</td>
                <td data-label="Quantity">${item.quantity}</td>
                <td data-label="Total">$${(item.quantity * item.price).toFixed(2)}</td>
                <td data-label="Action"><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Delete</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
        updateCartTotal();
    }

    renderCartItems();

    document.getElementById('clear-cart').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the cart?')) {
            purchasedItems = [];
            localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
            renderCartItems();
        }
    });

    document.getElementById('checkout').addEventListener('click', function() {
        if (purchasedItems.length > 0) {
            alert('Thank you for your purchase!');
            purchasedItems = [];
            localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
            renderCartItems();
        } else {
            alert('Your cart is empty. Please add items to your cart before checking out.');
        }
    });
});

function removeItem(index) {
    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
    purchasedItems.splice(index, 1);
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
    location.reload(); // Reload the page to re-render the cart
}
