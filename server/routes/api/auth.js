const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
const User = require("../../models/user");

const router = express.Router();

/*****************************************************************************
 * Error json
 *  note: developer feedback (e.g. message from `throw Error(_message_)`)
 * 	msg:  displayed to user; custom-set
 *  id:   determines msg location in UI; custom-set
 *****************************************************************************/

const getFilteredUserData = (savedUser) => {
	const { dateModified, email, type } = savedUser;
	const newData = {};
	if (type) newData.type = type;
	if (email) newData.email = email;
	if (dateModified) newData.dateModified = dateModified;
	return newData;
};

// ------------------- Sign-up -------------------

router.post("/sign-up", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ note: "Missing fields" });

	const user = await User.findOne({ email });
	if (user)
		return res.status(403).json({
			id: "EMAIL_NOT_UNIQUE",
			msg: "User already exists",
		});

	try {
		const salt = await bcrypt.genSalt(10);
		if (!salt) throw Error("Error with bcrypt");
		const hash = await bcrypt.hash(password, salt);
		if (!hash) throw Error("Error hashing the password");

		const dateRegistered = new Date();
		const type = "client";
		const newUser = new User({ email, password: hash, dateRegistered, type });
		const savedUser = await newUser.save();
		if (!savedUser) throw Error("Error saving the user");

		const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET);
		res.status(200).json({ token, ...getFilteredUserData(savedUser) });
	} catch (e) {
		res.status(500).json({ note: e.message });
	}
});

// --------------------- Sign-in ---------------------

router.post("/sign-in", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) throw Error("Missing credentials");

		const user = await User.findOne({ email });
		if (!user)
			return res.status(403).json({
				id: "WRONG_EMAIL",
				msg: "There's no such user",
			});

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(403).json({
				id: "WRONG_PASSWORD",
				msg: "Invalid credentials",
			});

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		if (!token) throw Error("Couldn't sign the token");

		res.status(200).json({ token, ...getFilteredUserData(user) });
	} catch (e) {
		res.status(400).json({ note: e.message });
	}
});

// ------------------ Sync user -----------------

router.post("/", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json({ note: "User doesn't exist" });

		const dateLocal = new Date(body.dateModified).getTime();
		const dateRemote = new Date(user.dateModified).getTime();
		if (dateLocal == dateRemote) return res.status(201).send();
		return res.status(200).json(getFilteredUserData(user));
	} catch (e) {
		res.status(400).json({ note: e.message });
	}
});

// ----------------- Update user ----------------
// acces: token & password

router.post("/update", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { password, newEmail, newPassword, type } = body;

		// Validate credentials
		if (!password) throw Error("Missing credentials");
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ note: "User doesn't exist" });
		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (!passwordsMatch)
			return res.status(403).json({
				id: "WRONG_PASSWORD",
				msg: "Invalid credentials",
			});

		// Update email
		let { email } = user;
		if (newEmail && newEmail !== email) {
			const foundUser = await User.findOne({ email: newEmail });
			if (foundUser)
				return res.status(403).json({
					id: "EMAIL_NOT_UNIQUE",
					msg: "User already exists",
				});
			user.email = newEmail;
		}

		// Update password
		if (newPassword) {
			const salt = await bcrypt.genSalt(10);
			if (!salt) throw Error("Error with bcrypt");
			const hash = await bcrypt.hash(newPassword, salt);
			if (!hash) throw Error("Error hashing the password");
			user.password = hash;
		}

		// Update rest
		if (type && type !== "superuser") user.type = type;
		user.dateModified = new Date();
		await user.save();

		return res.status(200).json(getFilteredUserData(user));
	} catch (e) {
		res.status(400).json({ note: e.message });
	}
});

// ---------------- Delete user ----------------

router.post("/delete", auth, async (req, res) => {
	try {
		const { password } = req.body;
		if (!password) throw Error("Missing credentials");

		const { userId } = req;
		const user = await User.findById(userId);
		if (!user) throw Error("User does not exist");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(403).json({
				id: "WRONG_PASSWORD",
				msg: "Invalid credentials",
			});

		await User.findByIdAndRemove(userId);
		res.status(200).send();
	} catch (e) {
		res.status(400).json({ note: e.message });
	}
});

// ----------------------------------------------------------------

module.exports = router;
