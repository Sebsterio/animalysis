const jwt = require("jsonwebtoken");

// Convert token into userId
function auth(req, res, next) {
	const token = req.header("x-auth-token");
	if (!token) return res.status(401).json({ msg: "MISSING_TOKEN" });
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decodedToken.userId;
		next();
	} catch (e) {
		res.status(401).json({ msg: "INVALID_TOKEN" });
	}
}

module.exports = auth;
