const utils = require("../../utils");
const { makeObjectWithoutUndefinedProps } = utils;

const filterProfile = (profile) => {
	const { firstName, surname, phone } = profile;
	return makeObjectWithoutUndefinedProps({ firstName, surname, phone });
};

module.exports = { filterProfile };
