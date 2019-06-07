var Session = require("../models/session.model");

module.exports.addToCart = function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId) {
		res.redirect("/products");
		return;
	}

	Session.findOne({sessionId: sessionId}, (err, sessionFound) => {
		if(err) console.log(err)
		else {
			if(!sessionFound.cart) {
				sessionFound.cart = {};
				sessionFound.set("cart." + productId, 1);
			}
			else if(!sessionFound.cart[productId]) {
				sessionFound.set("cart." + productId, 1);
			}
			else {
				var count = sessionFound.cart[productId];
				count = count + 1;
				sessionFound.set("cart." + productId, count);
			}
			sessionFound.save((err, saved) => {
				if(err) console.log(err)
				else console.log("updated!");
			});
		}
	})

	res.redirect("/products");
};