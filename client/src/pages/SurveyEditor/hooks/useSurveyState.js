import { useState } from "react";
import { getStepsFromDirection } from "../SurveyEditor-utils";
import {
	defaultQueues,
	initialSection,
	defaultSection,
	defaultQuestion,
	defaultAnswer,
} from "../SurveyEditor-defaults";
import {
	makeArrayWithReplacedItem,
	makeArrayWithRemovedItems,
	makeArrayWithMovedItem,
} from "utils/array";
import shortid from "shortid";

shortid.characters(
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_"
);

export const useSurveyState = () => {
	// ----------------------- State -----------------------

	const [queues, setQueues] = useState(defaultQueues);

	const [sections, setSections] = useState({
		initialSection: { ...initialSection },
	});

	// --------------------- Helpers ---------------------

	const getNewId = () => shortid.generate();

	const getNewName = () => "_" + getNewId();

	const helpers = {
		getNewName,
	};

	// --------------------- Selectors ---------------------

	const getQueues = () => queues;

	const getOptionalQueue = () => getQueues().optionalQueue.list;

	const getSectionsNamesAndTitles = () =>
		Object.entries(sections).map(([name, data]) => ({
			name,
			title: data.title,
		}));

	const getOptionalQueueNamesAndTitles = () => {
		const allSections = getSectionsNamesAndTitles();
		const optionalQueue = getOptionalQueue();
		return optionalQueue.map((section) => ({
			name: section,
			title: allSections.find((s) => s.name === section).title,
		}));
	};

	const getSectionData = (sectionName) => sections[sectionName];

	const selectors = {
		getQueues,
		getOptionalQueue,
		getSectionsNamesAndTitles,
		getOptionalQueueNamesAndTitles,
		getSectionData,
	};

	// --------------------- Operations ---------------------

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

	// Sections

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
		// setSections((sections) => {
		// 	const newSections = { ...sections };
		// 	delete newSections[sectionName];
		// 	return newSections;
		// });
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

	// Messy but quick solution. TODO: improve
	const deleteSectionFromAllAnswerTargets = (sectionToRemove) => {
		Object.entries(sections).forEach(([sectionName, { questions }]) => {
			questions.forEach(({ id: questionId, answers }) => {
				answers.forEach((answer) => {
					const { id: answerId, followUp } = answer;
					if (!!followUp && followUp.target.includes(sectionToRemove)) {
						updateAnswer({
							sectionName,
							questionId,
							answerId,
							value: {
								...answer,
								followUp: {
									...answer.followUp,
									target: makeArrayWithRemovedItems(
										followUp.target,
										sectionToRemove
									),
								},
							},
						});
					}
				});
			});
		});
	};

	// -----------------------

	const operations = {
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

	// -----------------------

	return [selectors, operations, helpers];
};
