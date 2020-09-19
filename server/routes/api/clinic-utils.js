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
		"logoUrl",
		"verified",
		"members",
		"emailNotifications",
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
		"logoUrl",
		"verified",
	];
	const filteredClinic = makeObjectWithSelectedProps(profile, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredClinic);
};

module.exports = { filterClinic, filterClientClinic };
