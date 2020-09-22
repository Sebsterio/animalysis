import { getPersonalizedString } from "./index";

const doesPetMatchCondition = (pet, condition) => {
	const [prop, value] = condition.split(':')
	return pet[prop] && typeof pet[prop] === 'string' && pet[prop].includes(value)
}

const removeSectionFromAllQueues = (itemToRemove, data) => 
	['primerQueue', 'mainQueue', 'optionalQueue'].forEach(queue =>
		data[queue] = data[queue].filter(item => item !== itemToRemove)
	)

// Adapt raw surveData to given pet
export const getPersonalizedSurveyData = (getState, pet) => {
	const data = getState().surveyData
	const sections = Object.entries(data.sections);

	let newData = { ...data };
	const newSections = {}

	sections.forEach(([sectionName, sectionData]) => {
		const {questions, condition} = sectionData
		
		// Filter out conditional sections that don't match pet
		if (condition) {
			const noMatch = !doesPetMatchCondition(pet, condition)
			if (noMatch) return removeSectionFromAllQueues(sectionName, newData)
		}
		
		// Inject pet props into question labels and aswer text
		const newQuestions = questions.map(
			(question) => {
				const { label, answers } = question;
				question.label = getPersonalizedString(label, pet);
				if (answers) question.answers = answers.map((answer) => ({
					...answer, text: getPersonalizedString(answer.text, pet),
				}));
				return question;
			}
		);
		
		newSections[sectionName] = { ...sectionData, questions: newQuestions }
	});

	return { ...newData, sections: newSections	};
};
