const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const Clinic = require("../../models/clinic");
const utils = require("./user-utils");
const clinicUtils = require("./clinic-utils");

const { filterUserReq, filterUserRes } = utils;
const { filterClientClinic } = clinicUtils;

const router = express.Router();

// TODO: extract repeated code

// ------------------- Sign-up -------------------
// Access: email & password
// Returns: user doc + token

router.post("/sign-up", async (req, res) => {
	try {
		const { email, password, type, firstName } = req.body;

		// Validate
		if (!email || !password) return res.status(400).json("Missing fields");
		if (type === "superuser")
			return res.status(403).json("Registering as superuser is not allowed");
		const foundUser = await User.findOne({ email });
		if (foundUser)
			return res.status(403).json({
				target: "email",
				msg: "User already exists",
			});

		// Get encrypted password
		const salt = await bcrypt.genSalt(10);
		if (!salt) throw Error("Error with bcrypt");
		const hash = await bcrypt.hash(password, salt);
		if (!hash) throw Error("Error hashing the password");

		// Create user
		const dateRegistered = new Date();
		const profile = { firstName };
		const saveData = { email, password: hash, dateRegistered, type, profile };
		const savedUser = await new User(saveData).save();
		if (!savedUser) throw Error("Error saving the user");

		// Generate token
		const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET);
		if (!token) throw Error("Couldn't sign the token");

		res.status(200).json({ token, ...filterUserRes(savedUser) });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// --------------------- Sign-in ---------------------
// Access: email & password
// Returns: user + token, profile, clinics

router.post("/sign-in", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validate
		if (!email || !password) return res.status(400).json("Missing credentials");
		const user = await User.findOne({ email });
		if (!user)
			return res.status(403).json({
				target: "email",
				msg: "There's no such user",
			});
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(403).json({
				target: "password",
				msg: "Invalid credentials",
			});

		// Generate new token
		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		if (!token) throw Error("Couldn't sign the token");

		// Get clinic data
		const { clinicInfo, clinicId } = user;
		let clinic = clinicInfo;
		if (clinicId) {
			const foundClinic = await Clinic.findById(user.clinicId);
			if (!foundClinic) user.clinicId = null;
			else clinic = foundClinic;
		}

		// Record action (non-blocking; for analytics only)
		user.dateSynced = new Date();
		user.save();

		// Send response
		const resData = {
			token,
			...filterUserRes(user), // includes profile
			clinic: filterClientClinic(clinic), // = clinicInfo || clinicId_data
		};
		return res.status(200).json(resData);
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ------------------ Sync user -----------------
// Access: token
// Returns: user, profile, clinics,

router.post("/", auth, async (req, res) => {
	try {
		const { userId, body } = req;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		// Record action (non-blocking; for analytics only)
		user.dateSynced = new Date();
		user.save();

		// Compare local and remote versions and determine response
		const dateLocal = new Date(body.dateModified).getTime();
		const dateRemote = new Date(user.dateModified).getTime();
		if (dateLocal == dateRemote) return res.status(201).send();

		// Get clinic data
		const { clinicInfo, clinicId } = user;
		let clinic = clinicInfo;
		if (clinicId) {
			const foundClinic = await Clinic.findById(user.clinicId);
			if (foundClinic) clinic = foundClinic;
		}

		// Send response
		const resData = {
			...filterUserRes(user), // includes profile
			clinic: filterClientClinic(clinic), // = clinicInfo || (clinicId -> data)
		};
		return res.status(200).json(resData);
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------- Update user ----------------
// Access: token (all upated) & password (sensitive updates)
// Returns: filtered user doc

router.post("/update", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { password, newEmail, newPassword, type } = body;

		// Validaate token
		const user = await User.findById(userId);
		if (!user) return res.status(404).json("User doesn't exist");

		// Validate password for sensitive updates
		if (newEmail || newPassword || type) {
			if (!password) throw Error("Missing credentials");
			const passwordsMatch = await bcrypt.compare(password, user.password);
			if (!passwordsMatch)
				return res.status(403).json({
					target: "password",
					msg: "Invalid credentials",
				});
		}

		// Prepare update
		const dateModified = new Date();
		const update = { ...filterUserReq(body), dateModified };

		// Validate type
		if (type) {
			if (type === "superuser")
				throw Error("Setting superuser type is not allowed");
			update.type = type;
		}

		// Validate newEmail
		if (newEmail && newEmail !== user.email) {
			const foundUser = await User.findOne({ email: newEmail });
			if (foundUser)
				return res.status(403).json({
					target: "newEmail",
					msg: "User already exists",
				});
			update.email = newEmail;
		}

		// Hash newPassword
		if (newPassword) {
			const salt = await bcrypt.genSalt(10);
			if (!salt) throw Error("Error with bcrypt");
			const hash = await bcrypt.hash(newPassword, salt);
			if (!hash) throw Error("Error hashing the password");
			update.password = hash;
		}

		// Execute update
		const config = { new: true };
		const updatedUser = await User.findByIdAndUpdate(userId, update, config);
		if (!updatedUser) throw Error("Error updating user");

		// Send response
		return res.status(200).json(filterUserRes(updatedUser));
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ---------------- Fetch user ----------------
// Access: token (clinicId must match between callee and caller)
// Returns: user doc

router.get("/:id", auth, async (req, res) => {
	try {
		const { userId, params } = req;
		const { id } = params;

		const caller = await User.findById(userId);
		const callee = await User.findById(id);
		if (!callee) throw Error("User does not exist");

		console.log({ caller: caller.clinicId, callee: callee.clinicId });
		const clinicsMatch = callee.clinicId.equals(caller.clinicId);
		if (!clinicsMatch) return res.status(401).json("ClinicId doesn't match");

		res.status(200).json(filterUserRes(callee));
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ---------------- Delete user ----------------
// Access: token & password
// Returns: 200

router.post("/delete", auth, async (req, res) => {
	try {
		const { password } = req.body;

		// Validate
		if (!password) throw Error("Missing credentials");
		const { userId } = req;
		const user = await User.findById(userId);
		if (!user) throw Error("User does not exist");
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res
				.status(403)
				.json({ target: "password", msg: "Invalid credentials" });

		// Execute and respond
		await User.findByIdAndRemove(userId);
		res.status(200).send();
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
