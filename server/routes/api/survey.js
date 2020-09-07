const express = require("express");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Survey = require("../../models/survey");
const User = require("../../models/user");
const Clinic = require("../../models/clinic");
const surveyUtils = require("./survey-utils");

const { filterSurvey } = surveyUtils;

const router = express.Router();

// ------------------- Publish survey -------------------
// access:
// 	default survey - superuser
//	custom survey - clinic admin/owner

router.post("/publish", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { surveyData, datePublished, clinicId } = body;

		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");
		const { type, email } = user;
		const isSuperuser = type === "superuser";

		// Determine which survey to fetch
		let query;
		if (isSuperuser) query = { isDefault: true };
		else {
			const clinic = await Clinic.findById(clinicId);
			if (!clinic) throw Error("Clinic doesn't exist");
			const isAuthorized = clinic.members.some(
				(m) => m.email === email && ["owner", "admin"].includes(m.role)
			);
			if (!isAuthorized) throw Error("User is not authorized to edit survey");
			query = { clinicId };
		}

		const addedData = { datePublished: new Date(), publishedBy: email };
		const update = { data: surveyData, ...addedData };
		const foundSurvey = await Survey.findOne(query);

		// EITHER create survey
		if (!foundSurvey) {
			const newSurvey = new Survey({ ...query, ...update });
			const savedSurvey = await newSurvey.save();
			if (!savedSurvey) throw Error("Error saving new survey");
		}

		// OR update survey
		else {
			const updateRes = await foundSurvey.updateOne(update); // no save()
			if (!updateRes.nModified) throw Error("Error updating survey");
		}

		res.status(200).json(filterSurvey(addedData));
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ------------------ Sync survey -----------------
// Access: public
// Returns: survey or 201

router.post("/", auth, async (req, res) => {
	try {
		const { body } = req;
		const { datePublished, clinicId } = body;

		// Determine which survey to fetch
		let query = clinicId ? { clinicId } : { isDefault: true };

		// Find survey
		const dateFetched = new Date();
		const survey = await Survey.findOneAndUpdate(query, { dateFetched });

		// Compare local and remote versions and determine response
		const dateLocal = new Date(datePublished).getTime();
		const dateRemote = new Date(survey.datePublished).getTime();

		if (dateLocal == dateRemote) return res.status(201).send();
		return res.status(200).json(filterSurvey(survey));
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
