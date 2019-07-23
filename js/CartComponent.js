Vue.component('cart', {
    data(){
        return{
            cartProducts:[],
            CartEmpty: true,
            standart_product_img_cart: 'https://placehold.it/50x50',
			TotalPrice: 0,
        }
    },
    methods: {
        addProductToCart(element){
			let find = this.cartProducts.find(el => el.id_product === element.id_product);
			if(find){
				find.quantity++;
			}
			else{
				let newCartProduct = Object.assign({quantity: 1}, element);
				this.cartProducts.push(newCartProduct);
				this.CheckIfCartEmpty();
			}
			//console.log(this.cartProducts);
			this.CalcTotalPrice();
		},
		removeProductFromCart(element){
            console.log(element);
			let find = this.cartProducts.find(el => el.id_product === element.id_product);
			if(find.quantity > 1){
				find.quantity--;
			}
			else{
				this.cartProducts.splice(this.cartProducts.indexOf(element), 1);
				this.CheckIfCartEmpty();
			}
			//console.log(this.cartProducts);
			this.CalcTotalPrice();
		},
		CheckIfCartEmpty(){
			this.CartEmpty = this.cartProducts.length<1 ? true:false;
		},
		CalcTotalPrice(){
		this.TotalPrice = 0;
		for (let el of this.cartProducts){
			this.TotalPrice += el.price*el.quantity;
		}
	}
    
    },
    template:`<div class="cart_block">
                <div class="total_price">Цена: {{TotalPrice}}</div>
                <a href='#' class="btn-cart btn" type="button">Корзина</a>  
                <div class="cart">

                <cart-item v-for="el of cartProducts"
                        :cartItem = "el"
                        :img = "standart_product_img_cart"
                        :key = "el.product_id"
						@removeProductFromCart = "removeProductFromCart">
                </cart-item>

				<div class = "no_items_cart" v-if="CartEmpty">Нет товаров</div>
              </div>
            </div>`
});

Vue.component('cart-item',{
    props: ['cartItem', 'img'],
    template: `<div class = "cart_item">
					<img :src = "img">
					<div class = "cart_info">
						<p>{{cartItem.product_name}}</p>
						<p>Цена: {{cartItem.price}}</p>
						<p>Кол-во: <span class = "cart_quantity">{{cartItem.quantity}}</span></p>
					</div>
					<a href = '#' class = "del_cart" @click="$emit('removeProductFromCart',cartItem)"">DEL</a>
				</div>`
});