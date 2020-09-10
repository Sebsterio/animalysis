const utils = require("../../utils");
const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

const filterPet = (pet) => {
	const allowedProps = [
		"id",
		"name",
		"species",
		"sex",
		"breed",
		"birthYear",
		"birthMonth",
		"weight",
		"microchip",
		"imageUrl",
		"dateUpdated",
		"clinicId",
		"userId",
	];
	const filteredPet = makeObjectWithSelectedProps(pet, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredPet);
};

module.exports = { filterPet };
