class OrderList {
    constructor(orderElement) {
        this.orderElement = orderElement;
    }

    /**@type{Order[]} **/ list = [];
    
    getTotal() {
        let total = 0;
        this.list.forEach(order => {
            total += order.quantity * order.item.price;
        })

        return total;
    }

    addViaID(id) {
        if (id >= this.list.length)
            throw new Error('ID doesn\'t exist');

        this.list.find(obj => obj.id == id).quantity++;
        this.updateUI();
    }

    add(/**@type{Item}**/item) {
        if (this.list.some(obj => obj.item.name == item.name && obj.item.price == item.price))   {
            this.list.find(obj => obj.item.name == item.name && obj.item.price == item.price).quantity++;
        }
        else {   
            const newOrder = new Order(item, 1, this.list.length);
            this.list.push(newOrder);
        }
        this.updateUI();
    }

    remove(/**@type{Number}**/id) {
        if (this.list[id].quantity > 1) {
            this.list[id].quantity--;
        }
        else {
            this.list.splice(id);
        }

        this.updateUI();
    }

    updateUI() {
        orderListElement.innerHTML = '';

        this.list.forEach(order => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${order.item.itemImage}" alt="item">
                <h2>${order.item.name}</h2>
                <h3>Php ${(order.item.price * order.quantity).toLocaleString()}</h3>
                <div class="quantity-container">
                    <button class="decrease">-</button>
                    <div class="quantity">${order.quantity}</div>
                    <button class="increase">+</button>
                </div>
            `;

            orderListElement.appendChild(itemElement);
        });
        
        decreaseButtons = document.querySelectorAll('.decrease');
        increaseButtons = document.querySelectorAll('.increase');
        
        increaseButtons.forEach(button => {
            button.removeEventListener('click', () => {
                increase(button);
            });
        });

        decreaseButtons.forEach(button => {
            button.removeEventListener('click', () => {
                decrease(button);
            });
        });
                
        increaseButtons.forEach(button => increase(button));
        decreaseButtons.forEach(button => decrease(button));

        checkOutButton.textContent = this.list.length > 0 ? `Check Out (Php ${this.getTotal().toLocaleString()})` : 'Check Out';
        totalOrders.textContent = this.list.length;
    }
}

function addToOrder(button) {
    button.addEventListener('click', () => {
        const imgSource = button.parentElement.parentElement.children[0].src;
        const orderName = button.parentElement.parentElement.children[1].textContent;
        const price = button.previousElementSibling.textContent;

        orderList.add(new Item(orderName, parseInt(price.split('Php')[1]).toFixed(2), imgSource));
    });
}

function increase(button) {
    button.addEventListener('click', () => {
        orderList.addViaID(getSiblingIndex(button.parentElement.parentElement));
    });
}

function decrease(button) {
    button.addEventListener('click', () => {
        orderList.remove(getSiblingIndex(button.parentElement.parentElement));
    });
}

function getSiblingIndex(element) {
    if (!element || !element.parentNode) {
        return -1;
    }

    return Array.prototype.indexOf.call(element.parentNode.children, element);
}

class Item {
    constructor(name, price, itemImage) {
        this.name = name;
        this.price = price;
        this.itemImage = itemImage;
    }
}

class Order {
    constructor (item, quantity, id) {
        this.item = item;
        this.quantity = quantity;
        this.id = id;
    }
}

const orderListElement = document.querySelector('#order-list');
const checkOutButton = document.querySelector('#check-out');
const closeOrdersButton = document.querySelector('#close-orders');
const totalOrders = document.querySelector('#total-orders');
let addToOrderButtons = document.querySelectorAll('.add-to-orders');
let decreaseButtons = document.querySelectorAll('.decrease');
let increaseButtons = document.querySelectorAll('.increase');
let callOnce = 0;

closeOrdersButton.addEventListener('click', () => {
    main.classList.toggle('show-tab');
});

orderListElement.innerHTML = '';

const orderList = new OrderList(orderListElement);

checkOutButton.addEventListener('click', () => {
    alert('Thank you for ordering at Insalan ni Insan! Your order will be with you soon!');
    orderList.list = [];
    orderList.updateUI();
});

addToOrderButtons.forEach(button => addToOrder(button)); 

menuCategories.forEach((category, index) => {
    category.addEventListener('click', () => {
        addToOrderButtons = document.querySelectorAll('.add-to-orders');
        addToOrderButtons.forEach(button => addToOrder(button)); 
        orderList.updateUI();
    });
});