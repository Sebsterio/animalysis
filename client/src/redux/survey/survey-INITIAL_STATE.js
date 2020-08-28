export const INITIAL_STATE = {
	// Question sections
	data: {},

	// Past  location in survey, along with selected answers
	// Used to 'goBack' and to compile final report
	// Last item = current location
	history: [
		// {
		// 	sectionName: "",   name of the section object in data
		// 	questionIndex: 0,  index in questions array in data[section]
		// 	answer: null,      index | [indexes] | text
		// },
	],

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

	// Popup triggered by orange alert (level 2)
	alertModalActive: false,

	// Report title; set in survey
	title: "",

	// ID of the pet the survye applies to
	petId: null,
};
