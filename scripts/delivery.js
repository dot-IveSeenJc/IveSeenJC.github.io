class MenuItem {
    constructor (foodName, foodDescriptions, foodPrices, foodImage) {
        this.foodName = foodName;
        this.foodDescriptions = foodDescriptions;
        this.foodPrices = foodPrices;
        this.foodImage = foodImage;
    }
}

class MenuGroup {
    constructor (groupName) {
        this.groupName = groupName;
    }

    formatDescriptionAndPrices(foodDescriptions, foodPrices) {
        if (foodDescriptions.length != foodPrices.length) {
            throw new Error('Descriptions and Prices aren\'t the same length');
        } 
        
        let formattedHTML = ''; 
        
        for (let index = 0; index < foodDescriptions.length; index++) {
            const description = foodDescriptions[index];
            const price = foodPrices[index];
            
            formattedHTML += `
                <p class="food-description">${description}</p>
                <div class="prices-container">
                    <h3 class="food-price">Php ${price.toFixed(2)}</h3>
                    <button class="add-to-orders" title="Add to orders">+</button>
                </div>
            `;

        }
        return formattedHTML;
    }

    generateGroup(menuItems) {
        menuItems.forEach(item => {
            if (item.foodImage == 'none' || item.foodImage == 'null' || item.foodImage == '') {
                item.foodImage = 'images/placeholder.jpg';
            }

            const formattedInfo = this.formatDescriptionAndPrices(item.foodDescriptions, item.foodPrices);
            const itemElement = document.createElement('div');
            itemElement.classList.add('menu-item');

            itemElement.innerHTML = `
                <img src="${item.foodImage}" alt="${item.foodName}">
                <h2 class="food-name">${item.foodName}</h2>
                ${formattedInfo}
                </div>
            `;
            menuOptions.appendChild(itemElement);
        });
    }
}

function onCategoryClicked(category, index) {
    menuCategories.forEach(category => {
        category.classList.remove('current');
    });
    category.classList.add('current');
    menuOptions.innerHTML = '';
    menuOptions.scrollTop = 0;
    groups[index].generateGroup(items[index]);
}

const main = document.querySelector('main');
const menuContainer = document.getElementById('delivery-container');
const menuCategories = document.querySelectorAll('.category');
const menuOptions = document.querySelector('.menu-options');
const viewOrdersButton = document.querySelector('#view-orders-button');

const silogImagesRoot = 'images/food-menu/silogs/';
const addonsImagesRoot = 'images/food-menu/addons/';
const mainImagesRoot = 'images/food-menu/main-dishes/';

viewOrdersButton.addEventListener('click', () => {
    main.classList.toggle('show-tab');
});

menuCategories.forEach((category, index) => {
    category.addEventListener('click', () => {
        onCategoryClicked(category, index);
    })
});

const groups = [
    new MenuGroup('Main Meals'),        
    new MenuGroup('Silogs'),            
    new MenuGroup('Addons')
];

const items = [
    [
        new MenuItem('Chicken Inasal', ['Unli Rice, Soup, Drinks', 'with rice'], [149, 129], mainImagesRoot + 'inasal.png'),
        new MenuItem('Pork Barbeque', ['Unli Rice, Soup, Drinks', 'with rice'], [149, 129], mainImagesRoot + 'bbq.png'),
        new MenuItem('Pork Sisig', ['Unli Rice, Soup, Drinks', 'with rice'], [149, 129], mainImagesRoot + 'pork-sisig.png'),
        new MenuItem('Pork Liempo', ['Unli Rice, Soup, Drinks', 'with rice'], [149, 129], mainImagesRoot + 'pork-liempo.png')
    ],
    [
        new MenuItem('Hamsilog', ['comes with an egg, ham, and vegetable rice'], [75], silogImagesRoot + 'hamsilog.png'),
        new MenuItem('Hotsilog', ['comes with an egg, hotdog, and vegetable rice'], [70], silogImagesRoot + 'hotsilog.png'),
        new MenuItem('Longsilog', ['comes with an egg, longganiza, and vegetable rice'], [75], silogImagesRoot + 'longsilog.png'),
        new MenuItem('Tocilog', ['comes with an egg, tocino, and vegetable rice'], [80], silogImagesRoot + 'tocilog.png'),
        new MenuItem('Daingsilog', ['comes with an egg, bonless bangus, and vegetable rice'], [100], silogImagesRoot + 'daingsilog.png'),
        new MenuItem('Spamsilog', ['comes with an egg, spam, and vegetable rice'], [75], silogImagesRoot + 'spamsilog.png')
    ],
    [
        new MenuItem('Egg', ['add extra egg in your order'], [15], addonsImagesRoot + 'Egg.png'),
        new MenuItem('Veggetable Rice', ['add extra veggie rice to your order'], [20], addonsImagesRoot + 'Veggie Rice.png'),
        new MenuItem('Plain Rice', ['add extra rice to your order'], [15], addonsImagesRoot + 'Plain Rice.png')
    ]
];

onCategoryClicked(menuCategories[0], 0);