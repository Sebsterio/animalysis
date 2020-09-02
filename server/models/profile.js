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
	clinicInfo: {
		name: String,
		address: String,
		email: String,
		phone: String,
	},
	clinicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Clinic",
	},
	dateUpdated: Date, // for sync
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
