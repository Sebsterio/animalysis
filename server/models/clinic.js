const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClinicSchema = new Schema({
	name: String,
	address: String,
	email: String,
	phone: String,
	phone2: String,
	logoUrl: String,
	verified: Boolean,
	members: [
		{
			email: String,
			role: String,
		},
	],
	dateRegistered: Date, // for finding stale documents
	dateSynced: Date, // for finding stale documents
	dateModified: Date, // for sync
	modifiedBy: String, // email (?)
});

ClinicSchema.index({
	name: "text",
	email: "text",
	address: "text",
	phone: "text",
});

const Clinic = mongoose.model("Clinic", ClinicSchema);

module.exports = Clinic;
