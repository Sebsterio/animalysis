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

	// --------------------- Selectors ---------------------

	const getQueues = () => queues;
	const getSectionData = (sectionName) => sections[sectionName];

	const selectors = {
		getQueues,
		getSectionData,
	};

	// --------------------- Operations ---------------------

	// Queue

	const addOrModifyQueue = (queueName, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		setQueues({ ...queues, [queueName]: modifier(queues[queueName]) });
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

	const moveSection = (queueName, sectionName, direction) => {
		const steps = getStepsFromDirection(direction);
		const selector = (listItem) => listItem === sectionName;
		modifyQueueList(queueName, (list) =>
			makeArrayWithMovedItem(list, null, steps, selector)
		);
	};

	// Sections

	const addOrModifySection = (id, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		setSections({ ...sections, [id]: modifier(sections[id]) });
	};

	const deleteSectionFromSections = (sectionName) => {
		const newSections = { ...sections };
		delete newSections[sectionName];
		setSections(newSections);
	};

	const modifySectionProp = (sectionName, prop, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		addOrModifySection(sectionName, (section) => ({
			...section,
			[prop]: modifier(section[prop]),
		}));
	};

	// Combo modifiers

	const addSection = (queueName) => {
		const sectionName = "_" + shortid.generate();
		addOrModifySection(sectionName, { ...defaultSection });
		modifyQueueList(queueName, (list) => [...list, sectionName]);
	};

	const deleteSection = (queueName, sectionName) => {
		deleteSectionFromSections(sectionName);
		modifyQueueList(queueName, (list) =>
			list.filter((item) => item !== sectionName)
		);
	};

	// Section title

	const modifySectionTitle = (id, value) =>
		modifySectionProp(id, "title", value);

	// Section questions

	const modifySectionQuestions = (id, value) =>
		modifySectionProp(id, "questions", value);

	const addQuestion = (sectionName) => {
		const newQuestion = { ...defaultQuestion, id: shortid.generate() };
		const modifier = (questions) => [...questions, newQuestion];
		modifySectionQuestions(sectionName, modifier);
	};

	const deleteQuestion = (sectionName, questionId) => {
		const selector = (question) => question.id === questionId;
		modifySectionQuestions(sectionName, (questions) =>
			makeArrayWithRemovedItems(questions, null, selector)
		);
	};

	const moveQuestion = (sectionName, questionId, direction) => {
		const steps = getStepsFromDirection(direction);
		const selector = (question) => question.id === questionId;
		modifySectionQuestions(sectionName, (questions) =>
			makeArrayWithMovedItem(questions, null, steps, selector)
		);
	};

	const updateQuestion = (sectionName, questionId, value) => {
		const selector = (question) => question.id === questionId;
		const modifier = typeof value === "function" ? value : () => ({ ...value });
		modifySectionQuestions(sectionName, (questions) =>
			makeArrayWithReplacedItem(questions, selector, modifier)
		);
	};

	const modifyQuestionProp = (sectionName, questionId, prop, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		updateQuestion(sectionName, questionId, (question) => ({
			...question,
			[prop]: modifier(question[prop]),
		}));
	};

	// Question answers

	const modifyAnswers = (sectionName, questionId, value) => {
		modifyQuestionProp(sectionName, questionId, "answers", value);
	};

	const addAnswer = (sectionName, questionId) => {
		const newAnswer = { ...defaultAnswer };
		modifyAnswers(sectionName, questionId, (answers) => [
			...answers,
			newAnswer,
		]);
	};

	const deleteAnswer = (sectionName, questionId, answerId) => {
		const selector = (answer) => answer.id === answerId;
		modifyAnswers(sectionName, questionId, (answers) =>
			makeArrayWithRemovedItems(answers, null, selector)
		);
	};

	// -----------------------

	const operations = {
		addOrModifyQueue,
		modifyQueueProp,
		modifyQueueList,
		moveSection,
		addOrModifySection,
		deleteSectionFromSections,
		modifySectionProp,
		addSection,
		deleteSection,
		modifySectionTitle,
		modifySectionQuestions,
		addQuestion,
		deleteQuestion,
		moveQuestion,
		updateQuestion,
		addAnswer,
		deleteAnswer,
	};

	// -----------------------

	return [selectors, operations];
};
