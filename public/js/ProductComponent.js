Vue.component('products', {
    data(){
        return {
		    products: [],
            filteredProducts: [],
            standart_product_img: 'https://placehold.it/200x150',
			load_error: false,
        }
    },
    methods: {
        filterGoods(searchLine){
			console.log('search');
         	const regexp = new RegExp(searchLine, 'i');
         	this.filteredProducts = this.products.filter(el => regexp.test(el.product_name));
		},
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            })
    },
    template: `<div class="products">
			<search @filterGoods = "filterGoods"></search>
			<div class="catalog">
				<product v-for="el of filteredProducts" 
                    :key="el.id_product"
                    :img="standart_product_img"
                    :product="el">
                </product>

				<div class = "no_items_catalog" v-if="this.filteredProducts.length<1">Нет товаров</div>
			</div>
		</div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item">
					<img :src='img' :alt='product.name' class="product_image">
					<div class="desc">
						<h3>{{product.product_name}}</h3>
						<p>Цена: {{product.price}}</p>
						<button class="buy-btn btn" @click="$root.$refs.cart.addProductToCart(product)">Купить</button>
					</div>
				</div>`
})

Vue.component('search',{
	data(){
		return {
			searchLine: ''
		}
	},
	template: `<form class="search">
					<input type="text" v-model='searchLine' placeholder="Искать здесь...">
					<button @click="$emit('filterGoods', searchLine)" type="submit"></button>
			</form>`
});