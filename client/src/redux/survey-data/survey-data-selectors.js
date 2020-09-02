export const getSurveyData = (state) => state.surveyData;

export const getSurveyDataForExport = (state) => {
	const {
		datePublished,
		primerQueue,
		mainQueue,
		optionalQueue,
		sections,
	} = getSurveyData(state);
	const toStringify = { primerQueue, mainQueue, optionalQueue, sections };
	const data = JSON.stringify(toStringify);
	return { data, datePublished };
};
