const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const products = new Vue({
	el: '.page',
	data: {
		searchLine: '',
		products: [],
		filteredProducts: [],
		cartProducts:[],
		CartEmpty: true,
		CatalogEmpty: false,
		standart_product_img: 'https://placehold.it/200x150',
		standart_product_img_cart: 'https://placehold.it/50x50'
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
		CheckIfCatalogEmpty(){
			this.CatalogEmpty = this.filteredProducts.length<1 ? true:false;
		},
		CheckIfCartEmpty(){
			this.CartEmpty = this.cartProducts.length<1 ? true:false;
		}
		
	},
	computed:{
		/*filteredList: function(){
			var search = this.searchLine;
                return this.products.filter(function (el) {
                    if(search===''){
						return true;
					} else {
						return el.product_name.indexOf(search) > -1;
					}
                })
		}*/
		
	},
	mounted() {
		this.fetchProducts();
	}
});
console.log(products);