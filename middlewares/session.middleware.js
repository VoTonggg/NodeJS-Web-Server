// var db = require("../db");
var Session = require("../models/session.model");
var shortid = require("shortid");

module.exports = function(req, res, next) {
	if(!req.signedCookies.sessionId) {
		var sessionId = shortid.generate();
		res.cookie("sessionId", sessionId, {
			signed: true
		});
		// db.get("sessions").push({
		// 	id: sessionId
		// }).write();
		var newSession = new Session({
			sessionId: sessionId
		});
		newSession.save((err, sessionCreated) => {
			if(err) console.log(err)
			else console.log("new session created!");
		});
	};

	next();
}