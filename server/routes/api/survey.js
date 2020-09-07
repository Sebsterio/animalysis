const express = require("express");
const auth = require("../../middleware/auth");
const Survey = require("../../models/survey");
const User = require("../../models/user");
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

		// Determine survey owner
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		// const isSuperuser = user.type === 'superuser'
		// let query;
		// if (isSuperuser) query = { isDefault: true }
		// else {
		// const {clinicId} = Clinic.findOne({members: [[contains userId]]})
		// query = { clinicId }
		// }
		const query = { isDefault: true };
		const { surveyData: data } = body;
		const addedData = { datePublished: new Date(), publishedBy: user.email };
		const update = { data, ...addedData };

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
		const { datePublished } = body;

		// Find survey (currently default survey only)
		const query = { isDefault: true };
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
