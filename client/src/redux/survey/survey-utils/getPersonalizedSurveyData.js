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
		if (condition && !doesPetMatchCondition(pet, condition)) {
			removeSectionFromAllQueues(sectionName, newData)
			return
		}
		
		// Inject pet props into question labels and aswer text
		const newQuestions = questions.map((question) => {
			const { label, answers } = question;
			const newLabel = getPersonalizedString(label, pet)
			if (!answers) return {...question, label: newLabel}
			let newAnswers = []
			answers.forEach((answer) => {
				const { text, condition } = answer
				const newText = getPersonalizedString(text, pet)
				const match = !condition || doesPetMatchCondition(pet, condition)
				if (match) newAnswers.push({...answer, text: newText}) 
			})
			return {...question, label: newLabel, answers: newAnswers};
		});
		
		newSections[sectionName] = { ...sectionData, questions: newQuestions }
	});

	return { ...newData, sections: newSections	};
};
