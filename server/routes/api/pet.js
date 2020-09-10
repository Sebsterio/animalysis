const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const Pet = require("../../models/pet");
const Report = require("../../models/report");
const utils = require("./pet-utils");

const { filterPet, filterReport } = utils;

const router = express.Router();

// ------------------- Create pet -------------------
// Access: token
// Returns: new pet ID and user dateModified

router.post("/create", auth, async (req, res) => {
	try {
		const { userId, body } = req;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		// Create Pet doc
		const dateCreated = new Date();
		const reportIds = [];
		const formData = filterPet(body);
		const saveData = { ...formData, userId, reportIds, dateCreated };
		const savedPet = await new Pet(saveData).save();
		if (!savedPet) throw Error("Error saving the pet");
		const { id } = savedPet;

		// Update user petIds & dateModified
		user.petIds.push(id);
		user.dateModified = dateCreated;
		user.save(); // no async

		// Send response
		res.status(200).json({ id, dateCreated });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ------------------- Update pet -------------------
// Access: token
// Returns: dateModified

router.post("/update", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { id, formData } = body;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		const dateUpdated = new Date();
		const update = { ...filterPet(formData), dateUpdated };
		const pet = await Pet.findByIdAndUpdate(id, update);
		if (!pet) return res.status(404).json("Pet doesn't exist");

		// Update user dateModified
		user.dateModified = dateUpdated;
		user.save(); // no async

		// Send response
		res.status(200).json({ dateUpdated });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ------------------- Add report -------------------
// Access: token
// Returns: dateUpdated (pet)

router.post("/report", auth, async (req, res) => {
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
// Access: token
// Returns: array of reports that are different than local

router.post("/sync", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { petId, reports: localReports } = body;

		// Validate
		const pet = await Pet.findById(petId);
		if (!pet) return res.status(404).json("Pet doesn't exist");

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
				// dateUpdated changed so add remote to diffs
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

// ------------------- Delete pet -------------------
// Access: token
// Returns: dateModified

router.delete("/:id", auth, async (req, res) => {
	try {
		const { userId, params } = req;
		const { id } = params;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		const petRes = await Pet.findByIdAndRemove(id);
		if (!petRes) return res.status(404).json("Pet doesn't exist");

		// Update user dateModified
		const dateModified = new Date();
		user.dateModified = dateModified;
		user.save(); // no async

		// Send response
		res.status(200).json({ dateModified });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
