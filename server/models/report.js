const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
	_id: String, // created on client for UX reasons
	petId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Pet",
		required: true,
	},
	title: String,
	problemList: [String],
	alert: Number,
	dateCreated: Date,
	dateModified: Date,
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
