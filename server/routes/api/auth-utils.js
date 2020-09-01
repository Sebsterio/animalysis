const utils = require("../../utils");
const { makeObjectWithoutUndefinedProps } = utils;

const filterUserForImport = (user) => {
	const { dateModified, email, type, password, newEmail, newPassword } = user;
	return makeObjectWithoutUndefinedProps({
		dateModified,
		email,
		type,
		password,
		newEmail,
		newPassword,
	});
};

const filterUserForExport = (user) => {
	const { dateModified, email, type } = user;
	return makeObjectWithoutUndefinedProps({ dateModified, email, type });
};

module.exports = { filterUserForImport, filterUserForExport };
