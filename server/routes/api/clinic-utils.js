const utils = require("../../utils");
const { makeObjectWithoutUndefinedProps } = utils;

// Make clinic with non-undefined props for vets
const filterClinic = (profile) => {
	const {
		id,
		clinicId,
		name,
		address,
		email,
		phone,
		phone2,
		logo,
		verified,
		members,
		dateModified,
		modifiedBy,
	} = profile;
	return makeObjectWithoutUndefinedProps({
		id,
		clinicId,
		name,
		address,
		email,
		phone,
		phone2,
		logo,
		verified,
		members,
		dateModified,
		modifiedBy,
	});
};

// Make clinic with non-undefined props for pet-owners
const filterClientClinic = (profile) => {
	const {
		id,
		clinicId,
		name,
		address,
		email,
		phone,
		phone2,
		logo,
		verified,
	} = profile;
	return makeObjectWithoutUndefinedProps({
		id,
		clinicId,
		name,
		address,
		email,
		phone,
		phone2,
		logo,
		verified,
	});
};

module.exports = { filterClinic, filterClientClinic };
