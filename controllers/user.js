const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
	res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const newUser = new User({ username, email });
		const registeredUser = await User.register(newUser, password);

		req.login(registeredUser, (err) => {
			if (err) {
				return next(err);
			}
			req.flash("success", "Welcome to WanderLust!");
			res.redirect("/listings");
		});
	} catch (err) {
		req.flash("error", err.message);
		res.redirect("/signup");
	}
};

module.exports.renderLogin = (req, res) => {
	res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
	req.flash("success", "Welcome to Wanderlust! You are logged in.");
	res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", "You have been logged out.");
		res.redirect("/listings");
	});
};
