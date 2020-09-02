const express = require("express");
const auth = require("../../middleware/auth");
const Survey = require("../../models/survey");
const User = require("../../models/user");
const surveyUtils = require("./survey-utils");

const { filterSurvey } = surveyUtils;

const router = express.Router();

// ------------------- Publish survey -------------------

router.post("/publish", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const submittedData = filterSurvey(body);

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
		const addedData = { datePublished: new Date(), publishedBy: user.email };
		const update = { ...submittedData, ...addedData };

		const foundSurvey = await Survey.findOne(query);

		// EITHER create survey
		if (!foundSurvey) {
			const newSurvey = new Survey({ ...query, ...update });
			const savedSurvey = await newSurvey.save();
			if (!savedSurvey) throw Error("Error saving new survey");
		}

		// OR update survey
		else {
			const res = await foundSurvey.updateOne(update); // secretly called on Model; no save()
			if (!res.nModified) throw Error("Error updating survey");
		}

		res.status(200).json(filterSurvey(addedData));
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// // ------------------ Fetch survey -----------------

router.post("/", auth, async (req, res) => {
	try {
		const { /* userId, */ body } = req;
		const submittedData = filterSurvey(body);

		const query = { isDefault: true };
		const dateFetched = new Date();
		const survey = await Survey.findOneAndUpdate(query, { dateFetched });

		// Compare local and remote versions and determine response
		const dateLocal = new Date(submittedData.datePublished).getTime();
		const dateRemote = new Date(survey.datePublished).getTime();

		if (dateLocal == dateRemote) return res.status(201).send();
		return res.status(200).json(filterSurvey(survey));
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// // ---------------- Delete survey ----------------

// router.delete("/", auth, async (req, res) => {
// 	try {
// 		const { userId } = req;
// 		const survey = await Survey.findOneAndRemove({ userId });
// 		if (!survey) throw Error("Survey doesn't exist");
// 		res.status(200).send();
// 	} catch (e) {
// 		res.status(400).json(e.message);
// 	}
// });

// ----------------------------------------------------------------

module.exports = router;
