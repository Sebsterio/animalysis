const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	// Hashed with bcrypt
	password: {
		type: String,
		required: true,
	},
	type: String, // client  | vet | superuser | demo
	profile: {
		firstName: String,
		surname: String,
		phone: String,
	},
	// Custom contact details of a non-registered clinic
	clinicInfo: {
		name: String,
		address: String,
		email: String,
		phone: String,
	},
	// Registered clinic (i.e. organisation)
	clinicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Clinic",
	},
	petIds: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Pet",
		},
	],
	// Meta
	dateRegistered: Date, // for finding stale documents
	dateSynced: Date, // for finding stale documents
	dateModified: Date, // for sync
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
