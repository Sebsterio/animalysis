const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const Pet = require("../../models/pet");
const Report = require("../../models/report");
const Clinic = require("../../models/clinic");
const utils = require("./pet-utils");

const { filterPet } = utils;

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

// ------------------- Sync pets -------------------
// Access: token; client & vet
// Returns: diffs OR all pets OR 201

router.post("/sync", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { pets: localPets } = body;

		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");
		const { petIds, type, email, clinicId } = user;

		// Validate vet user
		if (type === "vet") {
			const clinic = await Clinic.findById(clinicId);
			if (!clinic) return res.status(404).json("Clinic doesn't exists");
			const isMember = clinic.members.some((m) => m.email === email);
			if (!isMember)
				return res.status(403).json({
					target: "generic",
					msg: "You're not a member of this organisation.",
				});
		}

		// Get pets
		let pets =
			type === "client" && !!petIds.length
				? await Pet.find({ userId: user.id })
				: type === "vet" && !!clinicId
				? await Pet.find({ clinicId }).populate("userId")
				: [];
		if (!pets.length) return res.status(404).json("No pets have been found");

		// Format pets
		pets = pets.map((pet) => {
			pet = { ...filterPet(pet.toObject()), id: pet._id };
			if (type !== "vet") return pet;
			const { profile, email } = pet.userId; // now Object (after .populate())
			pet.owner = { ...profile, email };
			pet.userId = pet.userId._id; // restore prop from .populate()
			return pet;
		});

		// Send all results if localPets not provided
		if (!localPets.length) return res.status(200).json({ pets });

		// Else, determine diffs
		const diffs = [];
		pets.forEach((remote) => {
			const local = localPets.find((pet) => remote.id.equals(pet.id));
			if (local) {
				if (!local.dateUpdated && !remote.dateUpdated) return;
				const dateLocal = new Date(local.dateUpdated).getTime();
				const dateRemote = new Date(remote.dateUpdated).getTime();
				if (dateLocal == dateRemote) return;
			}
			diffs.push({ data: remote, isNew: !local ? true : false });
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

		// Flag reports as deleted
		const update = { deleted: true, dateUpdated: new Date() };
		await Report.update({ petId: id }, update, { multi: true });

		// Update user
		const dateModified = new Date();
		user.dateModified = dateModified;
		user.petIds = user.petIds.filter((petId) => petId !== id);
		user.save(); // non-blocking

		// Send response
		res.status(200).json({ dateModified });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
