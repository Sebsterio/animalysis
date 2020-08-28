import { getPersonalizedString } from "./index";

// Inject pet props into question labels and aswer text across survey data
export const getPersonalizedSurveyData = (data, pet) => {
	const newData = { ...data };
	const sections = Object.entries(newData.sections);

	sections.forEach(([sectionName, sectionData]) => {
		newData.sections[sectionName].questions = sectionData.questions.map(
			(question) => {
				const { label, answers } = question;
				question.label = getPersonalizedString(label, pet);
				if (answers) question.answers = answers.map((answer) => ({
					...answer, text: getPersonalizedString(answer.text, pet),
				}));
				return question;
			}
		);
	});

	return newData;
};
