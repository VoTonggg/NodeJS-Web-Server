require('dotenv').config();

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')

var userRoute = require("./routes/user.route");
var authRoute = require("./routes/auth.route");
var productsRoute = require("./routes/products.route");
var authMiddleware = require("./middlewares/auth.middleware");


var app = express();

var port = 6969;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));	
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("index", {
		name: "Vo Tong"
	});
});

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/products", productsRoute);

app.listen(port, function() {
	 console.log("Server is listening on port " + port);
});