const utils = require("../../utils");
const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

const filterPet = (pet) => {
	const allowedProps = [
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
	];
	const filteredPet = makeObjectWithSelectedProps(pet, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredPet);
};

module.exports = { filterPet };
