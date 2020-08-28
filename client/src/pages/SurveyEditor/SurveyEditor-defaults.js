export const defaultQueues = {
	primerQueue: {
		label: "Primer Queue",
		info:
			"Primer sections are presented only when reporting a problem, not during a routine health check.",
	},
	mainQueue: {
		label: "Main Queue",
		info:
			"Mandatory queue; interrupted only by a red alert. An orange alert allows the user to submit the results and then continue analysis.",
	},
	optionalQueue: {
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

export const message_optionalQueueIsEmpty =
	"There are currently no sections in Optional Queue.";

export const message_allOptionalSectionsAdded =
	"All Optional Queue sections are already added to this answer.";
