export const getSurveyData = (state) => state.surveyData;

export const getSurveyDataForExport = (state) => {
	const data = getSurveyData(state);
	const { primerQueue, mainQueue, optionalQueue, sections } = data;
	const toStringify = { primerQueue, mainQueue, optionalQueue, sections };
	return JSON.stringify(toStringify);
};

export const getDatePublished = (state) => getSurveyData(state).datePublished;
