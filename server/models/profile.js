const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	dateUpdated: Date, // for sync
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
