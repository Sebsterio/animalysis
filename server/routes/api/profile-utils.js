const utils = require("../../utils");
const { makeObjectWithoutUndefinedProps } = utils;

const filterProfile = (profile) => {
	const { firstName, surname, phone, clinicInfo, clinicId } = profile;
	return makeObjectWithoutUndefinedProps({
		firstName,
		surname,
		phone,
		clinicInfo,
		clinicId,
	});
};

module.exports = { filterProfile };
