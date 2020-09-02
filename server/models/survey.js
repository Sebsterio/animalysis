const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
	// clinicId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Clinic",
	// },
	isDefault: Boolean,
	datePublished: Date,
	publishedBy: String,
	data: String, // json
});

const Survey = mongoose.model("Survey", SurveySchema);

module.exports = Survey;
