const utils = require("../../utils");
const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

const filterSurvey = (survey) => {
	const allowedProps = ["data", "dateModified", "datePublished", "publishedBy"];
	const filteredSurvey = makeObjectWithSelectedProps(survey, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredSurvey);
};

module.exports = { filterSurvey };
