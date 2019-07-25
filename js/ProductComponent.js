Vue.component('products', {
    data(){
        return {
		    products: [],
            filteredProducts: [],
            standart_product_img: 'https://placehold.it/200x150',
            CatalogEmpty: false,
			load_error: false,
        }
    },
    methods: {
        fetchProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
					this.filteredProducts.push(el);
                }
			})
            .catch(error => {
			console.log(error);
			this.load_error = true;
			});
    	},
        filterGoods(searchLine){
			console.log('search');
         	const regexp = new RegExp(searchLine, 'i');
         	this.filteredProducts = this.products.filter(el => regexp.test(el.product_name));
			this.CheckIfCatalogEmpty();
		},
        CheckIfCatalogEmpty(){
			this.CatalogEmpty = this.filteredProducts.length<1 ? true:false;
		}
    },
    mounted(){
        this.fetchProducts();
    },
    template: `<div class="products">
			<search @filterGoods = "filterGoods"></search>
			<div class="catalog">
				<product v-for="el of filteredProducts" 
                    :key="el.id_product"
                    :img="standart_product_img"
                    :product="el">
                </product>

				<div class = "no_items_catalog" v-if="CatalogEmpty">Нет товаров</div>
				<load_error v-if="load_error"></load_error>
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