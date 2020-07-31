// Mark selected answer and unmark alternative answers
export const getDataWithAddedAnswer = (
	data,
	{ sectionRoute, questionRoute, answerIndex }
) => {
	const newData = [...data];

	newData.forEach((section) => {
		if (section.route === sectionRoute)
			section.questions.forEach((question) => {
				if (question.route === questionRoute)
					question.answers.forEach((answer, i) => {
						if (i === answerIndex) answer.selected = true;
						else answer.selected = false;
					});
			});
	});

	return newData;
};
