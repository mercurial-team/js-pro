Vue.component('cart', {
    data(){
        return{
            cartProducts:[],
            CartEmpty: true,
            standart_product_img_cart: 'https://placehold.it/50x50'
        }
    },
    methods: {
        addProductToCart(element){
			let find = this.cartProducts.find(el => el.id_product === element.id_product);
			if(find){
				element.quantity++;
			}
			else{
				Vue.set(element, 'quantity', 1)
				this.cartProducts.push(element);
				this.CheckIfCartEmpty();
			}
			//console.log(this.cartProducts);
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
		},
		CheckIfCartEmpty(){
			this.CartEmpty = this.cartProducts.length<1 ? true:false;
		}
    
    },
    template:`<div class="cart_block">
                <div class="total_price"></div>
                <a href='#' class="btn-cart btn" type="button">Корзина</a>  
                <div class="cart">

                <cart-item v-for="el of cartProducts"
                        :cartItem = "el"
                        :img = "standart_product_img_cart"
                        :key = "el.product_id">
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
					<a href = '#' class = "del_cart" @click="$root.$refs.cart.removeProductFromCart(cartItem)"">DEL</a>
				</div>`
});