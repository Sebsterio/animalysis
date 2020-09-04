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
		logo,
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
		logo,
		members,
		dateModified,
		modifiedBy,
	});
};

// Make clinic with non-undefined props for pet-owners
const filterClientClinic = (profile) => {
	const { id, clinicId, name, address, email, phone, logo } = profile;
	return makeObjectWithoutUndefinedProps({
		id,
		clinicId,
		name,
		address,
		email,
		phone,
		logo,
	});
};

module.exports = { filterClinic, filterClientClinic };
