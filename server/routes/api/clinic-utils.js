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
		members,
		dateModified,
		modifiedBy,
	});
};

// Make clinic with non-undefined props for pet-owners
const filterClientClinic = (profile) => {
	const { id, clinicId, name, address, email, phone } = profile;
	return makeObjectWithoutUndefinedProps({
		id,
		clinicId,
		name,
		address,
		email,
		phone,
	});
};

module.exports = { filterClinic, filterClientClinic };
