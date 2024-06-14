function CreateItem(id, name, category, image, description, quantity, price) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
}

let item1 = new CreateItem(1,'Men Beach Hawaiian Shirt','Men Shirt','https://5.imimg.com/data5/ANDROID/Default/2023/3/294755955/AZ/TW/XQ/36452206/product-jpeg-1000x1000.jpg','',1,80)
let item2 = new CreateItem(2,'Floral Beach Button Shirt','Men Shirt ','https://img.fruugo.com/product/8/23/193575238_0340_0340.jpg','',1,81)
let item3 = new CreateItem(3,'Summer Aloha Casual Short Sleeve','Mens Shirt','https://img.fruugo.com/product/8/04/193575048_max.jpg','',1,79)
let item4 = new CreateItem(4,'Printing Hawaiian Shirt Blouse','Men Shirt','https://img.joomcdn.net/c91ddcf9bf107bc6c24c3f7d9b709c4dfa3a9769_original.jpeg','',1,90)
let item5 = new CreateItem(5,'Geometric Print Hawaiian Shirt','Men Shirt','https://upload.joomcdn.net/3790c23eb824d05c07f4903103b2290e32953ca8_original.jpeg','',1,79)
let item6 = new CreateItem(6,'Hawaii Print','Men Shirt','https://img.joomcdn.net/99a5bc17101503187fff5c94762a173b8238e37f_original.jpeg','',1,82)
let item7 = new CreateItem(7,'Hawaii Shirt','Mens Shirt','https://img.joomcdn.net/7582cefc2cfc6b15544d4d2346137ffcbf54cad6_original.jpeg','',1,83)
let item8 = new CreateItem(8,'Casual Hawaiian Printed Short Sleeve','Mens Shirt','https://img.joomcdn.net/9854e39d820c6471ca33d56b4dba3c5122d1ef7a_original.jpeg','',1,85)
let item9 = new CreateItem(9,'Summer Clothing Sleeveless','Baby Blouses','https://img.fruugo.com/product/8/06/140886068_0340_0340.jpg','',1,86)
let item10 = new CreateItem(10,'Man T-shirt, Kids Look Summer Clothing','Family Clothes','https://img.fruugo.com/product/6/66/152572666_0340_0340.jpg','',1,150)
let item11 = new CreateItem(11,'Beach Boho Style Clothes Shawl Summer Dresses','Female Clothes','https://img.fruugo.com/product/2/46/951663462_0340_0340.jpg','',1,88)
let item12 = new CreateItem(12,'Casual Short Sleeve Summer Clothes','Women Clothes','https://img.fruugo.com/product/0/31/551497310_0340_0340.jpg','',1,90)
let item13 = new CreateItem(13,'Solid Color Bodysuit For Running Walking Wear','Female Clothes','https://img.fruugo.com/product/0/28/545347280_0340_0340.jpg','',1,87)
let item14 = new CreateItem(14,'Protective Thin Breathable Outdoor Cycling Sunscreen Clothes','Women Clothes','https://img.fruugo.com/product/1/86/1073947861_0340_0340.jpg','',1,89)
let item15 = new CreateItem(15,'Tie-dye Two Piece Set Summer Casual Sportswear Outfit','Women Clothes','https://img.fruugo.com/product/8/13/144655138_0340_0340.jpg','',1,89)

let items = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15];

let main = document.querySelector('.pro-container');

localStorage.setItem('items', JSON.stringify(items));

let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

// Existing code for creating items and rendering them

function renderItems(items) {
    const main = document.querySelector('.pro-container');
    main.innerHTML = ''; // Clear existing items

    items.forEach(item => {
        main.innerHTML += `
            <div class="pro">
                <img src="${item.image}" alt="">
                <div class="des">
                    <span>${item.name}</span>
                    <h5>${item.category}</h5>
                    <div class="star">
                        <i class="las la-star"></i>
                        <i class="las la-star"></i>
                        <i class="las la-star"></i>
                        <i class="las la-star"></i>
                        <i class="las la-star"></i>
                    </div>
                    <h4>$${item.price}</h4>
                    <div class="cart">
                        <button class="add-to-cart" data-id="${item.id}"><i class="las la-shopping-cart"></i></button>
                    </div>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary view-item" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${item.id}">
                    View
                    </button>
                </div>
            </div>
        `;
    });

    // Function to update the modal content
function updateModalContent(item) {
    document.getElementById('exampleModalLabel').textContent = item.name;
    document.getElementById('modal-image').src = item.image;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('modal-price').textContent = `$${item.price}`;
    document.getElementById('modal-add-to-cart').setAttribute('data-id', item.id);
}

// Add event listeners to the "View" buttons to update the modal
document.querySelectorAll('.view-item').forEach(button => {
    button.addEventListener('click', event => {
        const id = parseInt(event.currentTarget.getAttribute('data-id'));
        const item = items.find(item => item.id === id);
        updateModalContent(item);
    });
});
    // Re-add event listeners for add-to-cart and view-item buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            let id = parseInt(event.currentTarget.dataset.id);
            addToCart(id);
        });
    });

    document.querySelectorAll('.view-item').forEach(button => {
        button.addEventListener('click', event => {
            const id = parseInt(event.currentTarget.getAttribute('data-id'));
            const item = items.find(item => item.id === id);
            updateModalContent(item);
        });
    });
}

// Initial render
renderItems(items);

document.getElementById('sort-button').addEventListener('click', () => {
    items.sort((a, b) => a.name.localeCompare(b.name));
    renderItems(items);
});

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));
    renderItems(filteredItems);
});
