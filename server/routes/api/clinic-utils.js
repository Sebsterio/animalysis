const utils = require("../../utils");
const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

// Make clinic with non-undefined props for vets
const filterClinic = (profile) => {
	const allowedProps = [
		"id",
		"clinicId",
		"name",
		"address",
		"email",
		"phone",
		"phone2",
		"logo",
		"verified",
		"members",
		"dateModified",
		"modifiedBy",
	];
	const filteredClinic = makeObjectWithSelectedProps(profile, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredClinic);
};

// Make clinic with non-undefined props for pet-owners
const filterClientClinic = (profile) => {
	const allowedProps = [
		"id",
		"clinicId",
		"name",
		"address",
		"email",
		"phone",
		"phone2",
		"logo",
		"verified",
	];
	const filteredClinic = makeObjectWithSelectedProps(profile, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredClinic);
};

module.exports = { filterClinic, filterClientClinic };
