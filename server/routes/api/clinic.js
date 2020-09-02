const express = require("express");
const auth = require("../../middleware/auth");
const Clinic = require("../../models/clinic");
const clinicUtils = require("./clinic-utils");

const { filterClinic } = clinicUtils;

const router = express.Router();

// ------------------- Create clinic -------------------

router.post("/create", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const submittedData = filterClinic(body);

		// Validate
		const { email } = submittedData;
		const clinic = await Clinic.findOne({ email });
		if (clinic)
			return res.status(403).json({
				target: "email",
				msg: "Clinic already exists",
			});

		// Create clinic
		let { members } = submittedData;
		if (!members || !members.length) members = [];
		members.push({ userId, role: "owner" });
		const dateRegistered = new Date();
		const data = { members, dateRegistered, ...submittedData };
		const newClinic = new Clinic(data);
		const savedClinic = await newClinic.save();
		if (!savedClinic) throw Error("Error saving clinic");

		res.status(200).json(filterClinic(savedClinic));
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
