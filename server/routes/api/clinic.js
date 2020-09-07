const express = require("express");
const auth = require("../../middleware/auth");
const Clinic = require("../../models/clinic");
const User = require("../../models/user");
const clinicUtils = require("./clinic-utils");

const { filterClinic, filterClientClinic } = clinicUtils;

const router = express.Router();

/*****************************************************************
 * This is Clinic as in organization with members;
 * Clinic as the addresse of client's reports is stored on User
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

		// Add owner if not already added (manually)
		const user = await User.findById(userId);
		let { members } = submittedData;
		if (!members) members = [];
		if (!members.length || !members.some((m) => m.email === user.email))
			members.unshift({ email: user.email, role: "owner" });

		// Create clinic
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
// Acces: token, member/superuser
// Returns: full clinic data

router.post("/", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { clinicId } = body;

		// Validate
		const clinic = await Clinic.findById(clinicId);
		if (!clinic) return res.status(404).json("Clinic doesn't exists");
		const user = await User.findById(userId);
		const isSuperuser = user.type === "superuser";
		const isMember = clinic.members.some((m) => m.email === user.email);
		if (!isMember && !isSuperuser)
			return res.status(403).json({
				target: "generic",
				msg: "You're not a member of this organisation.",
			});

		const data = filterClinic(clinic);
		return res.status(200).json(data);
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ------------------ Search clinics -----------------
// acces: public

// Match any search terms; case insensitive
// Empty query: fetch all (excluding skipped and limited)
router.post("/search", async (req, res) => {
	try {
		const { query, skip = 0, limit = 10 } = req.body;

		const dbQuery = query ? { $text: { $search: query } } : null;
		const clinics = await Clinic.find(dbQuery).skip(skip).limit(limit);

		if (!clinics.length) return res.status(404).json("No results");

		const filteredClinics = clinics.map((clinic) => filterClientClinic(clinic));
		return res.status(200).json(filteredClinics);
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------- Update clinic ----------------
// acces: token

router.post("/update", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { clinicId, email, members, verified } = body;

		// Validate
		const clinic = await Clinic.findById(clinicId);
		if (!clinic) return res.status(404).json("Clinic doesn't exists");

		const user = await User.findById(userId);
		const isSuperuser = user.type === "superuser";
		const isAuthorized = clinic.members.some(
			(m) => m.email === user.email && ["owner", "admin"].includes(m.role)
		);
		if (!isAuthorized && !isSuperuser)
			return res.status(401).json("User is not authorized");

		if (verified !== clinic.verified && !isSuperuser)
			return res.status(401).json("Only superuser can change verified status");

		if (email && email !== clinic.email) {
			const duplicate = await Clinic.findOne({ email });
			if (duplicate)
				return res.status(403).json({
					target: "email",
					msg: "Already registered",
				});
		}

		if (!members.length)
			return res.status(403).json({
				target: "generic",
				msg: "Removing the last member is not allowed",
			});

		// TODO: on add/remove members, check if authorized

		// Update
		const dateModified = new Date();
		const update = { ...filterClinic(body), dateModified };
		const resp = await clinic.updateOne(update); // no save()
		if (!resp.nModified) throw Error("Error updating survey");

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
		const user = await User.findById(userId);
		const isSuperuser = user.type === "superuser";
		const getIsOwner = (m) => m.email === user.email && m.role === "owner";
		const isOwner = clinic.members.some(getIsOwner);
		if (!isOwner && !isSuperuser)
			return res.status(403).json("User is not a clinic owner");

		const deletedClinic = await Clinic.findByIdAndDelete(clinicId);
		if (!deletedClinic) throw Error("Error deleting clinic");
		res.status(200).send();
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
