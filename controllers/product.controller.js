var Product = require("../models/product.model");

module.exports.index = async function(req, res) {
	// var products = db.get("products").value();
	// var page = parseInt(req.query.page) || 1;
	// var perPage = 8;
	// var start = (page - 1) * perPage;
	// var end = page * perPage;

	// res.render("products/view", {
	// 	products: products.slice(start, end)
	// });
	var products = await Product.find();
	res.render("products/view", {
		products: products
	});
}