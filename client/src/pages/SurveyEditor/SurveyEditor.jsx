import React, { useState } from "react";
import shortid from "shortid";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";

import { Queue } from "./components";

import { useStyles } from "./SurveyEditor-styles";
import { getStepsFromDirection } from "./SurveyEditor-utils";
import {
	defaultQueues,
	defaultSection,
	defaultQuestion,
	defaultAnswer,
	initialSection,
} from "./SurveyEditor-defaults";
import {
	makeArrayWithReplacedItem,
	makeArrayWithRemovedItems,
	makeArrayWithMovedItem,
} from "utils/array";

shortid.characters(
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_"
);

/**************************************************************************
 * This module will be used very sparcely; performance is not a priority
 **************************************************************************/

export const SurveyEditor = () => {
	const clx = useStyles();

	// ---------------------- Popover ----------------------

	const [anchorEl, setAnchorEl] = useState(null);
	const [infoText, setInfoText] = useState("");

	const showPopover = (e, infoText) => {
		e.stopPropagation();
		setInfoText(infoText);
		setAnchorEl(e.currentTarget);
	};

	const hidePopover = (e) => {
		e.stopPropagation();
		setAnchorEl(null);
	};

	// ------------------------ Queues -------------------------

	const [queues, setQueues] = useState(defaultQueues);

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

	// ------------------------ Sections -------------------------

	const [sections, setSections] = useState({
		initialSection: { ...initialSection },
	});

	const getSectionData = (sectionName) => sections[sectionName];

	const addOrModifySection = (id, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		setSections({ ...sections, [id]: modifier(sections[id]) });
	};

	const modifySectionProp = (id, prop, value) => {
		const modifier = typeof value === "function" ? value : () => value;
		addOrModifySection(id, (section) => ({
			...section,
			[prop]: modifier(section[prop]),
		}));
	};

	const deleteSectionFromSections = (sectionName) => {
		const newSections = { ...sections };
		delete newSections[sectionName];
		setSections(newSections);
	};

	// ------------------------ Handlers -------------------------

	const modifyQueueList = (queueName, value) =>
		modifyQueueProp(queueName, "list", value);

	const modifySectionTitle = (id, value) =>
		modifySectionProp(id, "title", value);

	const modifySectionQuestions = (id, value) =>
		modifySectionProp(id, "questions", value);

	// -------------------- TO EXTRACT ---------------------------

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

	const moveSection = (queueName, sectionName, direction) => {
		const steps = getStepsFromDirection(direction);
		const selector = (listItem) => listItem === sectionName;
		modifyQueueList(queueName, (list) =>
			makeArrayWithMovedItem(list, null, steps, selector)
		);
	};

	const addQuestion = (sectionId) => {
		const newQuestion = { ...defaultQuestion, id: shortid.generate() };
		const modifier = (questions) => [...questions, newQuestion];
		modifySectionQuestions(sectionId, modifier);
	};

	const updateQuestion = (sectionId, data) => {
		const selector = (question) => question.id === data.id;
		modifySectionQuestions(sectionId, (questions) =>
			makeArrayWithReplacedItem(questions, null, { ...data }, selector)
		);
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

	// ----------------------------- View ------------------------------

	return (
		<div className={clx.page}>
			{/* ------------ Queues ------------ */}

			{Object.entries(queues).map(([queueName, queueProps]) => (
				<Queue
					key={queueName}
					name={queueName}
					{...queueProps}
					{...{ getSectionData, showPopover, addSection }}
					// Drilled props (section)
					{...{
						modifySectionTitle,
						deleteSection,
						moveSection,
						addQuestion,
						updateQuestion,
						deleteQuestion,
						moveQuestion,
					}}
				/>
			))}

			{/* ------------ Popover ------------ */}

			<Backdrop
				className={clx.backdrop}
				open={!!anchorEl}
				onClick={hidePopover}
				invisible
			>
				<Popover
					id="info-popover"
					open={!!anchorEl}
					anchorEl={anchorEl}
					onClose={hidePopover}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					transformOrigin={{ vertical: "top", horizontal: "center" }}
					children={<Typography className={clx.popover} children={infoText} />}
				/>
			</Backdrop>
		</div>
	);
};
