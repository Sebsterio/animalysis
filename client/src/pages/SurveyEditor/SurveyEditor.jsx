import React, { useState } from "react";
import shortid from "shortid";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";

import { Queue } from "./components";

import { makeArrayWithMovedItem } from "utils/array";
import { useStyles } from "./SurveyEditor-styles";
import {
	defaultQueues,
	defaultSection,
	defaultQuestion,
	defaultAnswer,
	initialSection,
} from "./SurveyEditor-defaults";

shortid.characters(
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_"
);

/**************************************************************************
 * This module will be used very sparcely; performance is not a priority
 **************************************************************************/

export const SurveyEditor = () => {
	const clx = useStyles();

	const [queues, setQueues] = useState(defaultQueues);
	const [sections, setSections] = useState({
		initialSection: { ...initialSection },
	});

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

	// ------------------------ Selectors -------------------------

	const getSectionData = (id) => sections[id];

	// ------------------------ Handlers -------------------------

	// --- Section ---

	const addSection = (queueName) => {
		const id = "_" + shortid.generate();
		const newSection = { ...defaultSection };
		setSections({ ...sections, [id]: newSection });

		const list = [...queues[queueName].list, id];
		const queueProps = { ...queues[queueName], list };
		setQueues({ ...queues, [queueName]: queueProps });
	};

	const deleteSection = (queueName, id) => {
		const newSections = { ...sections };
		delete newSections[id];
		setSections(newSections);

		const list = [...queues[queueName].list.filter((item) => item !== id)];
		const queueProps = { ...queues[queueName], list };
		setQueues({ ...queues, [queueName]: queueProps });
	};

	const updateSectionTitle = (id, title) => {
		setSections({ ...sections, [id]: { ...sections[id], title } });
	};

	const moveSection = (queueName, id, direction) => {
		const steps = direction === "down" ? 1 : direction === "up" ? -1 : 0;
		let list = [...queues[queueName].list];
		list = makeArrayWithMovedItem(list, id, steps);
		const queueProps = { ...queues[queueName], list };
		setQueues({ ...queues, [queueName]: queueProps });
	};

	// --- Question ---

	const addQuestion = (sectionId) => {
		const newQuestion = { ...defaultQuestion, id: shortid.generate() };
		const questions = [...sections[sectionId].questions, newQuestion];
		setSections({
			...sections,
			[sectionId]: { ...sections[sectionId], questions },
		});
	};

	const updateQuestion = (sectionId, data) => {
		const questions = sections[sectionId].questions.map((question) =>
			question.id === data.id ? { ...data } : question
		);
		setSections({
			...sections,
			[sectionId]: { ...sections[sectionId], questions },
		});
	};

	const deleteQuestion = (sectionId, questionId) => {
		const questions = sections[sectionId].questions.filter(
			(question) => question.id !== questionId
		);
		setSections({
			...sections,
			[sectionId]: { ...sections[sectionId], questions },
		});
	};

	const moveQuestion = (sectionId, questionId, direction) => {
		const steps = direction === "down" ? 1 : direction === "up" ? -1 : 0;
		let questions = [...sections[sectionId].questions];
		const selector = (question) => question.id === questionId;
		questions = makeArrayWithMovedItem(questions, null, steps, selector);
		setSections({
			...sections,
			[sectionId]: { ...sections[sectionId], questions },
		});
	};

	// --- Answer ---

	// const addAnswer = (sectionId, questionId) => {
	// 	const newAnswer = { ...defaultAnswer, id: shortid.generate() };
	// 	const questions = sections[sectionId].questions.map((question) =>
	// 		question.id === data.id ? { ...data } : question
	// 	);
	// 	updateQuestion();
	// };

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
						updateSectionTitle,
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
