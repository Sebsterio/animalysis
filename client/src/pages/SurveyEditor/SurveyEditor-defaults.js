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

const getinitialAnswer = (n) => ({
	id: "initialAnswer " + n,
	text: "Test answer " + n,
	alert: n,
	print: (() =>
		Math.random() < 0.3
			? "Hey how's it goin'"
			: Math.random() < 0.3
			? "Not too shabby"
			: "")(),
});

const getinitialQuestion = (n) => ({
	id: "initialQuestion " + n,
	label: "Test question " + n,
	type: "select-one",
	answers: [getinitialAnswer(1), getinitialAnswer(2), getinitialAnswer(3)],
});

export const initialSection = {
	id: "initialSection",
	title: "Test section",
	questions: [
		getinitialQuestion(1),
		getinitialQuestion(2),
		getinitialQuestion(3),
	],
};
