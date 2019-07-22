Vue.component('products', {
    data(){
        return {
            searchLine: '',
		    products: [],
            filteredProducts: [],
            standart_product_img: 'https://placehold.it/200x150',
            CatalogEmpty: false,
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
            .catch(error => console.log(error));
    	},
        filterGoods(){
         	const regexp = new RegExp(this.searchLine, 'i');
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
		
			<form class="search">
					<input type="text" v-model='searchLine' placeholder="Искать здесь...">
					<button @click.prevent="filterGoods()" type="submit"></button>
			</form>
			
			<div class="catalog">
				<product v-for="el of filteredProducts" 
                    :key="el.id_product"
                    :img="standart_product_img"
                    :product="el">
                </product>

				<div class = "no_items_catalog" v-if="CatalogEmpty">Нет товаров</div>
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