export const defaultQueues = {
	primerQueue: {
		list: [],
		label: "Primer Queue",
		info:
			"Primer sections are presented only when reporting a problem, not during a routine health check.",
	},
	mainQueue: {
		list: ["initialSection"],
		label: "Main Queue",
		info:
			"Mandatory queue; interrupted only by a red alert. An orange alert allows the user to submit the results and then continue analysis.",
	},
	optionalQueue: {
		list: [],
		label: "Optional Queue",
		info:
			"User may choose to run this queue after Main Queue. Optional Queue sections that are presented in Main Queue as follow-up sections get removed from Optional Queue to avoid duplicate questions.",
	},
};

export const defaultSection = {
	title: "Section name...",
	questions: [],
};

export const defaultQuestion = {
	label: "Question text...",
	type: "select-one",
	answers: [],
};

export const defaultAnswer = {
	text: "Answer text...",
};

// TEMP ========================

export const initialAnswer = {
	id: "initialAnswer",
	text: "Initial answer",
	alert: 3,
	print: "Stuff",
};

export const initialQuestion = {
	id: "initialQuestion",
	label: "Initial question",
	type: "select-one",
	answers: [{ ...initialAnswer }],
};

export const initialSection = {
	id: "initialSection",
	title: "Initial section",
	questions: [{ ...initialQuestion }],
};
