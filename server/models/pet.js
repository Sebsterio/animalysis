const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	name: String,
	species: String,
	sex: String,
	breed: String,
	birthYear: Number,
	birthMonth: Number,
	weight: Number,
	microchip: Number,
	imageUrl: String,
	reportIds: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Report",
		},
	],
	dateCreated: Date,
	dateUpdated: Date, // for reports sync
});

const Profile = mongoose.model("Pet", ProfileSchema);

module.exports = Profile;
