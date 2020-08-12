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

	// Queue to be optionally completed after main queue
	optionalQueue: [],

	// Read-only copy of optionalQueue
	// Used to match sections removed from queue to be re-added to optionalQueue
	initialOptionalQueue: [],

	// Highest level of urgency resulting from answers so far
	currentAlert: 0,

	// Read-only; set on startSurvey; used to calculate final alert level in Review
	initialAlert: 0,
};

// location in survey sequence; used as element of history and queues
// const location = {
// 	sectionName: "",  // = prop name of the data object
// 	questionIndex: 0, // index in the section array in data
// 	answer: null,     // index | [indexes] | text
// };
