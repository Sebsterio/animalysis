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
	type: String,
	role: String,
	date_registered: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
