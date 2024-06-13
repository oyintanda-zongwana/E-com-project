document.addEventListener('DOMContentLoaded', function() {
    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let cartTotal = 0;

    function updateCartTotal() {
        cartTotal = purchasedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
    }
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        purchasedItems.forEach((item, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Image"><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td data-label="Name">${item.name}</td>
                <td data-label="Category">${item.category}</td>
                <td data-label="Price">$${item.price}</td>
                <td data-label="Quantity">${item.quantity}</td>
                <td data-label="Total">$${item.quantity * item.price}</td>
                <td data-label="Action"><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Delete</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
        updateCartTotal();
    }

    renderCartItems();
});
function removeItem(index) {
    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
    purchasedItems.splice(index, 1);
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
    location.reload(); // Reload the page to re-render the cart
}
