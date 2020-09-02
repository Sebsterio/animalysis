const utils = require("../../utils");
const { makeObjectWithoutUndefinedProps } = utils;

const filterClinic = (profile) => {
	const {
		id,
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
		name,
		address,
		email,
		phone,
		members,
		dateModified,
		modifiedBy,
	});
};

module.exports = { filterClinic };
