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

	// Highest level of urgency resulting from answers so far
	alert: 0,
};

// location in survey sequence; used as element of history and queues
// const location = {
// 	sectionName: "",  // = prop name of the data object
// 	questionIndex: 0, // index in the section array in data
// 	answer: null,     // index | [indexes] | text
// };
