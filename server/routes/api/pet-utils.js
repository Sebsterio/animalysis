const utils = require("../../utils");
const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

// Get non-undefined Req props allowed to be spread in doc update
const filterPetReq = (pet) => {
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

// Get non-undefined props allowed to be spread in the Response
const filterPetRes = (pet) => {
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
		"reports", // not reportIds
	];
	const filteredPet = makeObjectWithSelectedProps(pet, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredPet);
};

module.exports = { filterPetReq, filterPetRes };
