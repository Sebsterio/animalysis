export const isQuestionAnswered = (questionData) =>
	questionData.answers.some((answer) => answer.selected === true);
