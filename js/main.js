const products = [
    {id: 1, title: 'Notebook', price: 2000, img: "images/product.jpg"},
    {id: 2, title: 'Keyboard', price: 200, img: "images/product.jpg"},
    {id: 3, title: 'Mouse', price: 47, img: "images/product.jpg"},
    {id: 4, title: 'Gamepad', price: 87, img: "images/product.jpg"},
    {id: 5, title: 'Chair', price: 187, img: "images/product.jpg"},
	{id: 6},
];

const renderProduct = (title = 'Неизвестный продукт', price = 0, img = "images/product.jpg") => {
    return `<div class="product-item">
				<img src = ${img} class = "product_image"></img>
                <h3>${title}</h3>
                <p>Цена: ${price}</p>
                <button class="buy-btn btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(el => renderProduct(el.title, el.price));
    document.querySelector(`.products`).innerHTML = productsList.join(" ");
	//Массив преобразуется в строку и записывается вместе с запятыми.
};

renderPage(products);