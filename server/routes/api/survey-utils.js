const utils = require("../../utils");
const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

const filterSurvey = (survey) => {
	const allowedProps = ["data", "dateModified", "datePublished", "publishedBy"];
	const filteredUser = makeObjectWithSelectedProps(survey, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredUser);
};

module.exports = { filterSurvey };
