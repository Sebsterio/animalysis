import { useState, useEffect, useRef, useReducer } from "react";
import {
	defaultQueues,
	defaultSection,
	defaultQuestion,
	defaultAnswer,
} from "../SurveyEditor-defaults";
import { getNewId, getStepsFromDirection } from "../SurveyEditor-utils";
import {
	makeArrayWithReplacedItem,
	makeArrayWithRemovedItems,
	makeArrayWithMovedItem,
} from "utils/array";

export const useSurveyState = (initialData) => {
	// ====================== Queues ======================

	const { primerQueue, mainQueue, optionalQueue } = initialData;

	const initialQueues = {
		primerQueue: { ...defaultQueues.primerQueue, list: [...primerQueue] },
		mainQueue: { ...defaultQueues.mainQueue, list: [...mainQueue] },
		optionalQueue: { ...defaultQueues.optionalQueue, list: [...optionalQueue] },
	};

	const [queues, setQueues] = useState(initialQueues);

	// ------ Selectors ------

	const getQueues = () => queues;

	const getOptionalQueue = () => getQueues().optionalQueue.list;

	// ------ Operations ------

	// Queue

	const addOrModifyQueue = (queueName, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		setQueues((queues) => ({
			...queues,
			[queueName]: modifier(queues[queueName]),
		}));
	};

	const modifyQueueProp = (queueName, prop, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		addOrModifyQueue(queueName, (queue) => ({
			...queue,
			[prop]: modifier(queue[prop]),
		}));
	};

	// Queue list

	const modifyQueueList = (queueName, value) =>
		modifyQueueProp(queueName, "list", value);

	const addSectionToQueue = ({ queueName, sectionName }) => {
		addOrModifySection(sectionName, { ...defaultSection });
		modifyQueueList(queueName, (list) => [...list, sectionName]);
	};

	const deleteSectionFromQueue = ({ queueName, sectionName }) => {
		modifyQueueList(queueName, (list) =>
			list.filter((item) => item !== sectionName)
		);
	};

	const moveSection = ({ queueName, sectionName, direction }) => {
		const steps = getStepsFromDirection(direction);
		const selector = (listItem) => listItem === sectionName;
		modifyQueueList(queueName, (list) =>
			makeArrayWithMovedItem(list, null, steps, selector)
		);
	};

	// ====================== Sections ======================

	const {
		sections: { ...initialSections },
	} = initialData;

	const [sections, setSections] = useState(initialSections);

	// ------ Selectors ------

	const getSectionData = (sectionName) => sections[sectionName];

	const getSections = () => sections;

	const getSectionsNamesAndTitles = () =>
		Object.entries(getSections()).map(([name, data]) => ({
			name,
			title: data.title,
		}));

	const getSectionNamesAndTitlesFromQueue = (queue) => {
		const allSections = getSectionsNamesAndTitles();
		return queue.map((section) => ({
			name: section,
			title: allSections.find((s) => s.name === section).title,
		}));
	};

	// ------ Operations ------

	const addOrModifySection = (sectionName, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		setSections((sections) => ({
			...sections,
			[sectionName]: modifier(sections[sectionName]),
		}));
	};

	const addSectionToSections = ({ sectionName }) => {
		addOrModifySection(sectionName, { ...defaultSection });
	};

	const deleteSectionFromSections = ({ sectionName }) => {
		deleteSectionFromAllAnswerTargets(sectionName);
		setSections((sections) => {
			const newSections = { ...sections };
			delete newSections[sectionName];
			return newSections;
		});
	};

	const modifySectionProp = (sectionName, prop, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		addOrModifySection(sectionName, (section) => ({
			...section,
			[prop]: modifier(section[prop]),
		}));
	};

	// Section title

	const modifySectionTitle = ({ sectionName, value }) =>
		modifySectionProp(sectionName, "title", value);

	// Questions

	const modifySectionQuestions = (sectionName, value) =>
		modifySectionProp(sectionName, "questions", value);

	const addQuestion = ({ sectionName }) => {
		const newQuestion = { ...defaultQuestion, id: getNewId() };
		const modifier = (questions) => [...questions, newQuestion];
		modifySectionQuestions(sectionName, modifier);
	};

	const deleteQuestion = ({ sectionName, questionId }) => {
		console.log({ sectionName, questionId });
		const selector = (question) => question.id === questionId;
		modifySectionQuestions(sectionName, (questions) =>
			makeArrayWithRemovedItems(questions, null, selector)
		);
	};

	const moveQuestion = ({ sectionName, questionId, direction }) => {
		const steps = getStepsFromDirection(direction);
		const selector = (question) => question.id === questionId;
		modifySectionQuestions(sectionName, (questions) =>
			makeArrayWithMovedItem(questions, null, steps, selector)
		);
	};

	const updateQuestion = ({ sectionName, questionId, value }) => {
		const selector = (question) => question.id === questionId;
		const modifier = typeof value === "function" ? value : () => value;
		modifySectionQuestions(sectionName, (questions) =>
			makeArrayWithReplacedItem(questions, selector, modifier)
		);
	};

	const modifyQuestionProp = (sectionName, questionId, prop, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		updateQuestion({
			sectionName,
			questionId,
			value: (question) => ({
				...question,
				[prop]: modifier(question[prop]),
			}),
		});
	};

	// Answers

	const modifyAnswers = (sectionName, questionId, value) => {
		modifyQuestionProp(sectionName, questionId, "answers", value);
	};

	const addAnswer = ({ sectionName, questionId }) => {
		const newAnswer = { ...defaultAnswer, id: getNewId() };
		modifyAnswers(sectionName, questionId, (answers) => [
			...answers,
			newAnswer,
		]);
	};

	const deleteAnswer = ({ sectionName, questionId, answerId }) => {
		const selector = (answer) => answer.id === answerId;
		modifyAnswers(sectionName, questionId, (answers) =>
			makeArrayWithRemovedItems(answers, null, selector)
		);
	};

	const moveAnswer = ({ sectionName, questionId, answerId, direction }) => {
		const steps = getStepsFromDirection(direction);
		const selector = (answer) => answer.id === answerId;
		modifyAnswers(sectionName, questionId, (answers) =>
			makeArrayWithMovedItem(answers, null, steps, selector)
		);
	};

	const updateAnswer = ({ sectionName, questionId, answerId, value }) => {
		const selector = (answer) => answer.id === answerId;
		const modifier = typeof value === "function" ? value : () => ({ ...value });
		modifyAnswers(sectionName, questionId, (answers) =>
			makeArrayWithReplacedItem(answers, selector, modifier)
		);
	};

	// Remove sectionName from the followUp.target prop of every answer in survey
	// prettier-ignore
	const deleteSectionFromAllAnswerTargets = (sectionToRemove) => {
		Object.entries(getSections()).forEach(([sectionName, { questions }]) => {
			questions.forEach(({ id: questionId, answers }) => {
				if (!!answers) answers.forEach((answer) => {
					const { id: answerId, followUp } = answer;
					if (!followUp || !followUp.target) return;
					if (followUp.target.includes(sectionToRemove)) {
						const { target } = followUp;
						const newTarget = makeArrayWithRemovedItems(target,sectionToRemove);
						const newFollowUp = { ...answer.followUp, target: newTarget };
						const newValue = { ...answer, followUp: newFollowUp };
						updateAnswer({ sectionName, questionId, answerId, value: newValue });
					}
				});
			});
		});
	};

	// ==================== Sync status ====================

	// This is the cleanest solution I found
	// On mount, timesUpdated sets to 0
	// On first update, timesUpdated sets to 1
	// -> hasChanged = true, isPublished = false

	const { datePublished } = initialData;

	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	const timesUpdated = useRef(-1);
	const isPublished = useRef(!!datePublished);

	useEffect(() => {
		timesUpdated.current++;
		if (timesUpdated.current === 1) {
			isPublished.current = false;
			forceUpdate();
		}
	}, [queues, sections]);

	const getHasChanged = () => timesUpdated.current > 0;
	const getIsPublished = () => isPublished.current;

	const resetHasChanged = () => (timesUpdated.current = 0);
	const resetIsPublished = () => (isPublished.current = true);

	// ====================== Exports ======================

	const selectors = {
		getQueues,
		getOptionalQueue,
		getSections,
		getSectionsNamesAndTitles,
		getSectionNamesAndTitlesFromQueue,
		getSectionData,
		getHasChanged,
		getIsPublished,
	};

	const operations = {
		resetHasChanged,
		resetIsPublished,
		addSectionToQueue,
		deleteSectionFromQueue,
		moveSection,
		addSectionToSections,
		modifySectionTitle,
		deleteSectionFromSections,
		addQuestion,
		deleteQuestion,
		moveQuestion,
		updateQuestion,
		addAnswer,
		deleteAnswer,
		moveAnswer,
		updateAnswer,
	};

	return [selectors, operations];
};
