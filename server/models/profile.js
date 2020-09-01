const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	firstName: String,
	surname: String,
	phone: String,
	dateUpdated: Date,
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
