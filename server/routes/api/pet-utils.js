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
	];
	const filteredPet = makeObjectWithSelectedProps(pet, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredPet);
};

const filterReport = (report) => {
	const allowedProps = [
		"petId",
		"dateCreated",
		"dateUpdated",
		"title",
		"alert",
		"problemList",
	];
	const filteredPet = makeObjectWithSelectedProps(report, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredPet);
};

module.exports = { filterPet, filterReport };
