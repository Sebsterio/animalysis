const utils = require("../../utils");
const { makeObjectWithoutUndefinedProps } = utils;

const filterSurvey = (profile) => {
	const { data, dateModified, datePublished, publishedBy } = profile;
	return makeObjectWithoutUndefinedProps({
		data,
		dateModified,
		datePublished,
		publishedBy,
	});
};

module.exports = { filterSurvey };
