const express = require("express");
const auth = require("../../middleware/auth");
const Clinic = require("../../models/clinic");
const clinicUtils = require("./clinic-utils");

const { filterClinic } = clinicUtils;

const router = express.Router();

/*****************************************************************
 * This is Clinic as in organization with members;
 * Clinic as the addresse of client's reports is stored on Profile
 *****************************************************************/

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

// ------------------ Fetch clinic -----------------

router.post("/", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { dateModified, clinicId } = filterClinic(body);

		// Validate
		const clinic = await Clinic.findById(clinicId);
		if (!clinic) return res.status(404).json("Clinic doesn't exists");

		const isMember = clinic.members.some((m) => m.userId.equals(userId));
		if (!isMember) return res.status(403).json("User is not a clinic member");

		// Compare local and remote versions to determine response
		const dateLocal = new Date(dateModified).getTime();
		const dateRemote = new Date(clinic.dateModified).getTime();

		if (dateLocal === dateRemote) return res.status(201).send();
		return res.status(200).json(filterClinic(clinic));
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------- Update clinic ----------------
// acces: token

router.post("/update", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const submittedData = filterClinic(body);
		const { clinicId } = submittedData;

		// Validate
		const clinic = await Clinic.findById(clinicId);
		if (!clinic) return res.status(404).json("Clinic doesn't exists");
		const isMember = clinic.members.some((m) => m.userId.equals(userId));
		if (!isMember) return res.status(403).json("User is not a clinic member");

		// Update
		const dateModified = new Date();
		const update = { ...submittedData, dateModified };
		const res = await clinic.updateOne(update); // no save()
		if (!res.nModified) throw Error("Error updating survey");

		return res.status(200).json({ dateModified });
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ---------------- Delete clinic ----------------

router.post("/delete", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const submittedData = filterClinic(body);
		const { clinicId } = submittedData;

		// Validate
		const clinic = await Clinic.findById(clinicId);
		if (!clinic) return res.status(404).json("Clinic doesn't exists");
		const isOwner = clinic.members.some(
			(m) => m.userId.equals(userId) && m.role === "owner"
		);
		if (!isOwner) return res.status(403).json("User is not a clinic owner");

		const deletedClinic = await Clinic.findByIdAndDelete(clinicId);
		if (!deletedClinic) throw Error("Error deleting clinic");
		res.status(200).send();
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
