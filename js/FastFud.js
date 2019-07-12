class Hamburger {
	constructor(stuffing) {
		this.size = stuffing.size;
		this.option = stuffing.option;
		this.adds = stuffing.Toppings;
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
		
		let burgerCategory = document.querySelector(".burgerCategory");
		let options = burgerCategory.querySelectorAll("input[type=radio]");
		for (let i = 0; i < options.length; i++) {
			if (options[i].checked){
				this.size = options[i].value;
				console.log(this);
			};
		}
		this.calculateCalories();
		this.calculatePrice();
	}
	getStuffing() { // Узнать начинку гамбургера 
		console.log("Начинка");
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
	calculatePrice() { // Узнать цену 
		let price = 0;
		switch(this.size){
			case "large": 
				price +=100;
				break;
			case "small": 
				price +=50;
				break;
		}
		switch(this.option){
			case "cheese": 
				price +=10;
				break;
			case "salad": 
				price +=20;
				break;
			case "Potato": 
				price +=15;
				break;
		}
		for(let element of this.adds){
			switch(element){
				case "Mayonnaise":
					price += 20;
					break;
				case "Seasoning":
					price += 15;
					break;
			}
		}
		let price_block = document.querySelector(".price");
		price_block.innerHTML = `Цена: ${price} руб`;
	}
	calculateCalories() { // Узнать калорийность 
		let calories = 0;
		switch(this.size){
			case "large": 
				calories +=40;
				break;
			case "small": 
				calories +=20;
				break;
		}
		switch(this.option){
			case "cheese": 
				calories +=20;
				break;
			case "salad": 
				calories +=5;
				break;
			case "Potato": 
				calories +=10;
				break;
		}
		for(let element of this.adds){
			switch(element){
				case "Mayonnaise":
					calories += 5;
					break;
			}
		}
		let calories_block = document.querySelector(".calorie");
		calories_block.innerHTML = `Калории: ${calories}`;
	}
}

let stuffing = {
	size: '',
	option: '',
	Toppings: [],
}

let order = new Hamburger(stuffing);
