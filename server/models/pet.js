const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema({
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
	reportIds: [String], // yup
	dateCreated: Date,
	dateUpdated: Date, // for reports sync
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
