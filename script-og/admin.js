document.addEventListener('DOMContentLoaded', function() {
    // Product Constructor Function
    function Product(id, name, category, image, description, quantity, price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.image = image;
        this.description = description || '';
        this.quantity = quantity;
        this.price = price;
    }

    let products = JSON.parse(localStorage.getItem('items')) || [];

    function renderProducts() {
        const productsTableBody = document.querySelector('#products-table tbody');
        productsTableBody.innerHTML = '';

        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="text" class="form-control" value="${product.name}" data-index="${index}" data-field="name"></td>
                <td><input type="text" class="form-control" value="${product.category}" data-index="${index}" data-field="category"></td>
                <td>
                    
                    <img src="${product.image}" alt="${product.name}" style="max-width: 50px; display: block; margin-top: 5px;">
                </td>
                <td><input type="text" class="form-control" value="${product.description}" data-index="${index}" data-field="description"></td>
                <td><input type="number" class="form-control" value="${product.quantity}" data-index="${index}" data-field="quantity"></td>
                <td><input type="number" class="form-control" value="${product.price}" data-index="${index}" data-field="price"></td>
                <td>
                    <button class="btn btn-danger btn-sm delete-product" data-index="${index}">Delete</button>
                </td>
            `;
            productsTableBody.appendChild(row);
        });

        // Add event listeners for the delete buttons
        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                products.splice(index, 1);
                localStorage.setItem('items', JSON.stringify(products));
                renderProducts();
            });
        });

        // Add event listeners for input fields to update products
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const field = this.getAttribute('data-field');
                products[index][field] = this.value;
                localStorage.setItem('items', JSON.stringify(products));
            });
        });
    }

    document.getElementById('add-product-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const newProduct = new Product(
            products.length + 1,
            document.getElementById('product-name').value,
            document.getElementById('product-category').value,
            document.getElementById('product-image').value,
            document.getElementById('product-description').value,
            parseInt(document.getElementById('product-quantity').value),
            parseFloat(document.getElementById('product-price').value)
        );

        products.push(newProduct);
        localStorage.setItem('items', JSON.stringify(products));
        renderProducts();
        this.reset();
    });

    renderProducts();
});
