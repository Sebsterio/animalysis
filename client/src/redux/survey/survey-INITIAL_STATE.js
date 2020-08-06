import { surveyData } from "./survey-data";

export const INITIAL_STATE = {
	// Question sections
	data: {},

	// Past  location in survey, along with selected answers
	// Used to 'goBack' and to compile final report
	// Last item = current location
	history: [],

	// Locations to visit next; unshifted on 'goBack';
	// answers kept and used to restore location & history on 'goNext'
	queue: [],

	// Highest level of urgency resulting from answers so far
	alert: 0,

	// Queue to be optionally completed after main queue
	optionalQueue: surveyData.optionalQueue,
};

// location is survey; used in history and queue
const location = {
	sectionName: "", // Current section in data
	questionIndex: 0, // Current question in section
	answer: null, // index | array-of-indexes | text
};
