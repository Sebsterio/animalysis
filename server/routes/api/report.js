const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const Pet = require("../../models/pet");
const Report = require("../../models/report");
const utils = require("./report-utils");

const { filterReport } = utils;

const router = express.Router();

// ------------------- Add report -------------------
// Access: token
// Returns: dateUpdated (pet)

router.post("/add", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { id, petId } = body;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");
		const pet = await Pet.findById(petId);
		if (!pet) return res.status(404).json("Pet doesn't exist");

		// Create report
		const docData = { _id: id, ...filterReport(body) };
		const report = await new Report(docData).save();
		if (!report) throw Error("Error creating report");

		// Update pet reportIds & dateUpdated
		const { reportIds } = pet;
		const dateUpdated = new Date();
		if (!reportIds) pet.reportIds = [];
		pet.reportIds.push(id);
		pet.dateUpdated = dateUpdated;
		pet.save();

		// Send response
		res.status(200).json({ dateUpdated });
	} catch (e) {
		res.status(500).json(e.message);
	}
});
// ---------------- Sync pet reports ----------------
// Access: token; client & vet
// Returns: diffs

router.post("/sync-all", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { petId, reports: localReports } = body;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");
		const pet = await Pet.findById(petId);
		if (!pet) return res.status(404).json("Pet doesn't exist");
		const { type, clinicId } = user;
		if (
			(type === "vet" && !pet.clinicId.equals(clinicId)) ||
			(type === "client" && !pet.userId.equals(userId))
		)
			return res.status(401).json("Not authorized to fetch pet");

		// Get pet reports and determine diffs
		const remoteReports = await Report.find({ petId: pet.id });
		const diffs = [];
		remoteReports
			.map((report) => report.toObject()) // else get props with remote._doc.prop
			.forEach((remote) => {
				const local = localReports.find((rep) => rep.id === remote._id);
				if (local) {
					if (!local.dateUpdated && !remote.dateUpdated) return;
					const dateLocal = new Date(local.dateUpdated).getTime();
					const dateRemote = new Date(remote.dateUpdated).getTime();
					if (dateLocal == dateRemote) return;
				}
				// dateUpdated changed or remote is new, so add remote to diffs
				const data = { ...filterReport(remote), id: remote._id };
				const isNew = !local ? true : false;
				diffs.push({ data, isNew });
			});

		// Send response
		if (!diffs.length) return res.status(201).send();
		res.status(200).json({ diffs });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ---------------- Update pet report ----------------
// Access: token; client & vet
// Returns: dateUpdated
// TODO: authorization

router.post("/update", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { id, update } = body;
		const { dateSeen } = update;

		const dateUpdated = dateSeen ? dateSeen : new Date();
		const updateData = { ...filterReport(update), dateUpdated };
		const report = await Report.findByIdAndUpdate(id, updateData);
		if (!report) return res.status(404).json("Report doesn't exist");

		res.status(200).json({ dateUpdated });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
