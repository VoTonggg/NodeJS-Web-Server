var express = require("express");
var bodyParser = require("body-parser");
var userRoute = require("./routes/user.route");

var app = express();

var port = 6969;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));	

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("index", {
		name: "Vo Tong"
	});
});

app.use("/users", userRoute);

app.listen(port, function() {
	 console.log("Server is listening on port " + port);
});