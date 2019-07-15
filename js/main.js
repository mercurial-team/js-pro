const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

class Products {
    constructor(cartObject, container=`.products`){
        this.container = container;
        this.data = [];
        this.allProduct = [];
		this.totalPrice = 0;
		this.cart = cartObject;
		//this.cart.buttonsListener = cartObject._addEventListenerForBuyButtons;
        this.init();
    }
    init(){
        this._fetchProducts()
			.then(
				() => {
					this._render();
				}
			)
			.then(
				() =>{
					this.cart._addEventListenerForBuyButtons();
				}
			)
    }
	calcTotalPrice(){
		for (let el of this.AllProducts) {
			this.totalPrice += el.price;
		}
		return this.totalPrice;
	}
    _fetchProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log(error));
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
        this.product_name = el.product_name;
        this.id_product = el.id_product;
        this.price = el.price;
        this.img = img;
    }
    render() {
            return `<div class="product-item">
                 <img src="${this.img}" alt="${this.product_name} class = "product_image"">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p> Цена: ${this.price}</p>
                     <button class="buy-btn btn" data-id = "${this.id_product}" data-price = "${this.price}"
					 data-name = "${this.product_name}">Купить</button>
                 </div>
             </div>`
    }
}

class Cart {
    constructor(container=`.cart`, buy_button = `.buy-btn`){
		this.container = container;
        this.data = {};
        this.allProduct = [];
		this.buy_button = buy_button;
		this.init();
    }
	init(){
		this._fetchCartProducts()
		.then(
			() => {
				this._renderCart();
			}
		);
	}
	addProductToCart(){
		const block = document.querySelector(this.container);
		let newItem  = {
			product_name : event.target.dataset.name,
			price: event.target.dataset.price,
			id_product: +event.target.dataset.id,
			quantity: 1,
		}
		let pushMark = 1;
		for (let el of this.allProduct){
				if (el.id_product == +event.target.dataset.id){
					el.quantity +=1;
					this.setQuantity(el);
					pushMark = 0;
					break;
				} 
		}
		if (pushMark == 1){
			this.allProduct.push(newItem);
			block.insertAdjacentHTML('beforeend', this._renderCartItem(newItem));
		}
		
		console.log(this.allProduct);
	}
	removeProductFromCart(){
		if (event.target.classList.contains('del_cart')){
			let item  = event.target.parentElement;
			//Удаляем из корзины
			item.parentElement.removeChild(item);
			//Удаляем из продуктов
			for (let el of this.allProduct){
				if (el.id_product == event.target.dataset.id){
					this.allProduct.splice(this.allProduct.indexOf(el), 1);
				}
			}
		}
	console.log(this.allProduct);
	}
	setQuantity(item){
		const block = document.querySelector(this.container);
		let all_items = block.querySelectorAll(`${this.container}_item`);
		for (let el of all_items){
			if (el.dataset.id == item.id_product){
				el.querySelector(".cart_quantity").innerHTML = item.quantity;
			}
		}
	}
	_addEventListenerForBuyButtons(){
		let prodbuy = document.querySelectorAll(this.buy_button);
		for (let el of prodbuy){
			el.onclick = this.addProductToCart.bind(this);
		}
	}
	_addEventListenerForDelButtons(){
		let prodDel = document.querySelectorAll(this.container);
		for (let el of prodDel){
			el.onclick = this.removeProductFromCart.bind(this);
		}
	}
	_fetchCartProducts(){
		//Получаем данные от сервера для формирования корзины
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.data = new Object(data);
            })
            .catch(error => console.log(error));
    }
	_renderCart(){
		const block = document.querySelector(this.container);
       for (let el of this.data.contents) {
		    this.allProduct.push(el);
			block.insertAdjacentHTML('beforeend', this._renderCartItem(el));
        }
		this._addEventListenerForDelButtons();
	}
	_renderCartItem(item){
		return `<div class = "cart_item" data-id = "${item.id_product}">
					<img src = "https://placehold.it/50x50">
					<div class = "cart_info" data-id = "${item.id_product}">
						<p>${item.product_name}</br>
						Цена: ${item.price}</br>
						Кол-во: <span class = "cart_quantity">${item.quantity}</span></p>
					</div>
					<a href = '#' class = "del_cart" data-id = "${item.id_product}">DEL</a>
				</div>`;
	}
	_calcTotalPrice(){
		//В конце корзины нам наверняка потребуется общая стоимость
	}
	

}

let cart = new Cart();
const products = new Products(cart);




//Стандарт
 let getRequest = (url, cb) => {
     let xhr = new XMLHttpRequest();
     xhr.open('GET', url, true);
     xhr.onreadystatechange = () => {
         if(xhr.readyState === 4) {
             if(xhr.status !== 200) {
                 cb('error');
             } else {
                 cb(xhr.responseText);
             }
         }
     };
     xhr.send();
 };
 
function callBack(result){
	//console.log(result);
}
 
let xdata = getRequest(`${API}/catalogData.json`, callBack);


//Переписанная с промисами
let getRequestPromise = (url) => {
	 return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);	
		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4) {
				if(xhr.status !== 200) {
					reject('error');
				} else {
					resolve(xhr.responseText);
				}
			}
		};
		xhr.send();		
	});	     
 };
 
getRequestPromise(`${API}/catalogData.json`)
.then(
	result => {
		//console.log(result)
	},
	error => {
		//console.log(error)
	}
)

