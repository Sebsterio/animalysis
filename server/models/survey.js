const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
	// clinicId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Clinic",
	// },
	isDefault: Boolean, // false = clinic-specific survey
	dateFetched: Date, // for finding stale documents
	datePublished: Date,
	publishedBy: String, // user email
	data: String, // json
});

const Survey = mongoose.model("Survey", SurveySchema);

module.exports = Survey;
