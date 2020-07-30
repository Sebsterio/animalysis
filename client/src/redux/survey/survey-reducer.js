import { surveyData } from "./survey-data";

// Answers get added to surveyData and submitted altogether
// pageStack (FILO) keeps track of pages to return to upon completing current page (which is at the top of the stack)

const INITIAL_STATE = {
	data: surveyData,
	pageStack: null,
};

const surveyReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default surveyReducer;
