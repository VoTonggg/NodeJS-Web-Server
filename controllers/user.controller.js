var User = require("../models/user.model");


module.exports.index = async function(req, res) {
	var users = await User.find();
	res.render("users/index", {
		users: users
	});
};

module.exports.search = async function(req, res) {
	var q = req.query.q;
	// var users = db.get("users").value();
	var users = await User.find();
	var matchedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render("users/index", {
		users: matchedUsers,
		q: q
	});
};

module.exports.create = function(req, res) {
	res.render("users/create");
};

module.exports.get = async function(req, res) {
	var id = req.params.id;
	// var user = db.get("users").find({id: id}).value();
	var user = await User.findById(id);
	res.render("users/view", {
		user: user
	});
};

module.exports.postCreate = async function(req, res) {
	// req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split("/").slice(1).join("/");
	
	// db.get("users").push(req.body).write();	
	// await User.update({}, {$push: {users: req.body}}, done);
	var newUser = new User({
		name: req.body.name,
		phone: req.body.phone,
		avatar: req.body.avatar

	});
	newUser.save(function(err, user) {
		if(err) return console.log(err);
		console.log(user.name + "saved to the database!");
	});
	res.redirect("/users");
};
