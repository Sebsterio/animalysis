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
	isAdmin: Boolean, // if type = vet
	dateRegistered: {
		// for finding stale documents
		type: Date,
		required: true,
	},
	dateModified: Date, // for sync
	dateSynced: Date, // for finding stale documents
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
