const utils = require("../../utils");
const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

const filterReport = (report) => {
	const allowedProps = [
		"petId",
		"dateCreated",
		"dateUpdated",
		"title",
		"alert",
		"problemList",
		"dateSeen",
	];
	const filteredPet = makeObjectWithSelectedProps(report, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredPet);
};

module.exports = { filterReport };
