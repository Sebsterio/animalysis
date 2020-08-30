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
		type: Date,
		required: true,
	},
	dateModified: Date,
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
