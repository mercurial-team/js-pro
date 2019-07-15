class Hamburger {
	constructor() {
		this.size = '';
		this.option = '';
		this.adds = [];
		this.priceAndCalories = {
			size: {
				small:{
					price: 50,
					calories: 20
				},
				large:{
					price:100,
					calories: 40
				}
			},
			options: {
				cheese: {
					price: 10,
					calories: 20
				},
				salad: {
					price: 20,
					calories: 5
				},
				Potato: {
					price: 15,
					calories: 10
				}
			},
			adds:{
				Mayonnaise: {
					price: 20,
					calories: 5
				},
				Seasoning: {
					price: 15,
					calories: 0
				}
			}
		}
		this.init();
	}
	init() {
		//Слушаем размер
		let size_buttons = document.querySelectorAll(".size_input");
		//console.log(size_buttons);
		for (let element of size_buttons) {
			//console.log(element);
			element.onclick = this.getSize.bind(this);
		}
		//Слушаем Добавки
		let opt_buttons = document.querySelectorAll(".opt_input");
		for (let element of opt_buttons) {
			element.onclick = this.getStuffing.bind(this);
		}
		//Слушаем топинги
		let top_buttons = document.querySelectorAll(".top_input");
		console.log(top_buttons);
		for (let element of top_buttons) {
			element.onclick = this.getToppings.bind(this);
		}
	}

	getToppings(topping) { // Получить список добавок
		
		this.adds = [];
		let Toppings = document.querySelector(".burgerAdds");
		let options = Toppings.querySelectorAll("input[type=checkbox]");
		for (let i = 0; i < options.length; i++) {
			if (options[i].checked){
				console.log(options);
				this.adds.push(options[i].value);
				console.log(this);
			};
		}
		this.calculateCalories();
		this.calculatePrice();
		
	}
	getSize() { // Узнать размер гамбургера 
		this.GetChar('.burgerCategory', 'input[type=radio]');
	}
	getStuffing() { // Узнать начинку гамбургера 
		//this.GetChar(".burgerOptions", "input[type=radio]");
		let burgerOptions = document.querySelector(".burgerOptions");
		let options = burgerOptions.querySelectorAll("input[type=radio]");
		for (let i = 0; i < options.length; i++) {
			if (options[i].checked){
				this.option = options[i].value;
				console.log(this);
			};
		}
		this.calculateCalories();
		this.calculatePrice();
	}
	
	GetChar(mainSelector, buttonSelector){
		console.log(this);
		let burgerCategory = document.querySelector(mainSelector);
		let options = burgerCategory.querySelectorAll(buttonSelector);
		for (let i = 0; i < options.length; i++) {
			if (options[i].checked){
				this.size = options[i].value;
				console.log(this);
			};
		}
		this.calculateCalories();
		this.calculatePrice();
	}
	
	calculatePrice() { // Узнать цену 
		let price = 0;
		console.log(this.priceAndCalories);
		//Считаем цену
		if (this.size) price += this.priceAndCalories.size[this.size].price;
		if (this.option) price += this.priceAndCalories.options[this.option].price;
		for (let el of this.adds){
			price += this.priceAndCalories.adds[el].price;
		} 
		
		let price_block = document.querySelector(".price");
		price_block.innerHTML = `Цена: ${price} руб`;
	}
	calculateCalories() { // Узнать калорийность 
		let calories = 0;
		
		if (this.size) calories += this.priceAndCalories.size[this.size].calories;
		if (this.option) calories += this.priceAndCalories.options[this.option].calories;
		for (let el of this.adds){
			calories += this.priceAndCalories.adds[el].calories;
		} 
		
		let calories_block = document.querySelector(".calorie");
		calories_block.innerHTML = `Калории: ${calories}`;
	}
}

let order = new Hamburger();
