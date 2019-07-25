let add = (cart, req) => {
    cart.contents.push(req.body);
	calc_total_price(cart);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
	calc_total_price(cart);
    return JSON.stringify(cart, null, 4);
};
let delete_item = (cart,req) => {
	let find = cart.contents.find(el => el.id_product === +req.params.id);
	//console.log(typeof(cart.contents));
	//console.log(cart.contents);
	cart.contents.splice(cart.contents.indexOf(find), 1);
	calc_total_price(cart);
	return JSON.stringify(cart, null, 4);
}
let calc_total_price = (cart)=>{
	cart.countGoods = cart.contents.length;
	cart.amount = 0;
	for (el of cart.contents){
		cart.amount += el.price*el.quantity;
	}
}
module.exports = {
    add,
    change,
	delete_item
};