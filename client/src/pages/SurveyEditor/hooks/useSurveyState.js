import { useState } from "react";
import { getStepsFromDirection } from "../SurveyEditor-utils";
import {
	defaultQueues,
	initialSection,
	defaultSection,
	defaultQuestion,
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

	const addQuestion = (sectionId) => {
		const newQuestion = { ...defaultQuestion, id: shortid.generate() };
		const modifier = (questions) => [...questions, newQuestion];
		modifySectionQuestions(sectionId, modifier);
	};

	const deleteQuestion = (sectionId, questionId) => {
		const selector = (question) => question.id === questionId;
		modifySectionQuestions(sectionId, (questions) =>
			makeArrayWithRemovedItems(questions, null, selector)
		);
	};

	const moveQuestion = (sectionId, questionId, direction) => {
		const steps = getStepsFromDirection(direction);
		const selector = (question) => question.id === questionId;
		modifySectionQuestions(sectionId, (questions) =>
			makeArrayWithMovedItem(questions, null, steps, selector)
		);
	};

	const updateQuestion = (sectionId, data) => {
		const selector = (question) => question.id === data.id;
		modifySectionQuestions(sectionId, (questions) =>
			makeArrayWithReplacedItem(questions, null, { ...data }, selector)
		);
	};

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
	};

	return [selectors, operations];
};
