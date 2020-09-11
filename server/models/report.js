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
	problemList: [{ print: String, printNote: String }],
	alert: Number,
	dateCreated: Date,
	dateUpdated: Date,
	dateSeen: Date,
	deleted: Boolean,
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
