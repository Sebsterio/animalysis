const utils = require("../../utils");
const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

// Get non-undefined Req props allowed to be spread in doc update
const filterUserReq = (user) => {
	const allowedProps = ["profile", "clinicInfo", "clinicId", "pets"];
	const filteredUser = makeObjectWithSelectedProps(user, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredUser);
};

// Get non-undefined User props allowed to be spread in the Response
const filterUserRes = (user) => {
	const allowedProps = [
		"email",
		"type",
		"profile",
		"clinic", // not cLinicId or clinicInfo
		"pets", // not petIds
		"dateModified",
	];
	const filteredUser = makeObjectWithSelectedProps(user, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredUser);
};

module.exports = { filterUserReq, filterUserRes };
