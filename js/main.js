class Products {
    constructor(container=`.products`){
        this.container = container;
        this.data = [];
        this.allProduct = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render();
		this.calcTotalPrice();
    }
	calcTotalPrice(){
		this.totalPrice = 0;
		for (let el of this.data) {
			this.totalPrice += el.price;
		}
		return this.totalPrice;
	}
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Keyboard', price: 200},
            {id: 3, title: 'Mouse', price: 47},
            {id: 4, title: 'Gamepad', price: 87},
            {id: 5, title: 'Chair', price: 187},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProduct.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    constructor(el, img='https://placehold.it/200x150'){
        this.title = el.title;
        this.id = el.id;
        this.price = el.price;
        this.img = img;
    }
    render() {
            return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title} class = "product_image"">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p> Цена: ${this.price}</p>
                     <button class="buy-btn btn">Купить</button>
                 </div>
             </div>`
    }
}

class Cart {
    constructor(container=`.cart`){
		this.container = container;
        this.data = [];
        this.allProduct = [];
    }
	addProductToCart(){
		// будет добавлять товар в корзину
	}
	removeProductFromCart(){
		// будем удалять товар из корзины
	}
	setQuantity(){
		//Будем устанавливать количество конкретного товара для операций + -
		//Или поля ввода количества товара
	}
	_fetchCartProducts(){
		//Получаем данные от сервера для формирования корзины
        this.data = [
            {id: 1, title: 'Notebook', price: 2000, quantity: 1},
            {id: 4, title: 'Gamepad', price: 87, quantity: 3},
        ];
    }
	_renderCart(){
		//будем отрисовыввать корзину тут
	}
	_renderCartItem(){
		//будем тут отрисовывать единицу товара в корзине.
		//Этот метод можно также создать в классе ProductItem, вместо текущего класса.
	}
	_calcTotalPrice(){
		//В конце корзины нам наверняка потребуется общая стоимость
	}
	

}
const products = new Products();
console.log(products.calcTotalPrice())