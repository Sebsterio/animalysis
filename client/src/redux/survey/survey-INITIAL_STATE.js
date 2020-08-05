import { surveyData } from "./survey-data";

export const INITIAL_STATE = {
	// Question sections
	data: {},

	// Current location is survey
	location: {
		sectionName: "", // Current section
		questionIndex: 0, // Current question
		answer: null, // index | array-of-indexes | text
	},

	// Past  location in survey, along with selected answers
	// Used to 'goBack' and to compile final report
	history: [],

	// Locations to visit next; unshifted on 'goBack';
	// answers kept and used to restore location & history on 'goNext'
	queue: [],

	// Highest level of urgency resulting from answers so far
	alert: 0,

	// Queue to be optionally completed after the main one
	optionalQueue: surveyData.optionalQueue,
};
