Vue.component('cart', {
    data(){
        return{
            cartProducts:[],
            standart_product_img_cart: 'https://placehold.it/50x50',
			TotalPrice: 0,
			countGoods: 0,
        }
    },
    methods: {
        addProductToCart(element){
			let find = this.cartProducts.find(el => el.id_product === element.id_product);
			if(find){
				this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
							console.log(data);
                            find.quantity++;
							this.TotalPrice = data.cartInfo.amount;
                        }
                    })
			}
			else{
				let newCartProduct = Object.assign({quantity: 1}, element);
				this.$parent.postJson(`/api/cart`, newCartProduct)
                    .then(data => {
                        if(data.result){
                            this.cartProducts.push(newCartProduct);
							this.TotalPrice = data.cartInfo.amount;
							this.countGoods = data.cartInfo.countGoods;
                        }
                    })
			}
		},
		removeProductFromCart(element){
            //console.log(element);
			let find = this.cartProducts.find(el => el.id_product === element.id_product);
			if(find.quantity > 1){
				this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result){
                            find.quantity--;
							this.TotalPrice = data.cartInfo.amount;
                        }
                    })
			}
			else{
				this.$parent.putJson(`/api/cart/${find.id_product}?delete_item=1`)
                    .then(data => {
                        if(data.result){
                            this.cartProducts.splice(this.cartProducts.indexOf(element), 1);
							this.TotalPrice = data.cartInfo.amount;
							this.countGoods = data.cartInfo.countGoods;
                        }
                    })
			}
		},  
    },
	mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartProducts.push(el);
                }
				this.TotalPrice = data.amount;
				this.countGoods = data.countGoods;
            });
    },
    template:`<div class="cart_block">
                <div class="total_price">Цена: {{TotalPrice}} </br> Позиций: {{countGoods}}</div>
                <a href='#' class="btn-cart btn" type="button">Корзина</a>  
                <div class="cart">

                <cart-item v-for="el of cartProducts"
                        :cartItem = "el"
                        :img = "standart_product_img_cart"
                        :key = "el.product_id"
						@removeProductFromCart = "removeProductFromCart">
                </cart-item>

				<div class = "no_items_cart" v-if="cartProducts.length<1">Нет товаров</div>
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