var Product = require("../models/product.model");

module.exports.index = function(req, res) {
	// var products = db.get("products").value();
	// var page = parseInt(req.query.page) || 1;
	// var perPage = 8;
	// var start = (page - 1) * perPage;
	// var end = page * perPage;

	// res.render("products/view", {
	// 	products: products.slice(start, end)
	// });
	Product.find().then(function(products) {
		res.render("products/view ", {
			products: products
		});
	});
}