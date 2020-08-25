import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";

import { Queue } from "./components";

import shortid from "shortid";
import { useStyles } from "./SurveyEditor-styles";
import {
	defaultQueues,
	defaultSection,
	defaultQuestion,
} from "./SurveyEditor-defaults";

shortid.characters(
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_"
);

/**************************************************************************
 * This component will be used very sparcely; performance is not a priority
 **************************************************************************/

export const SurveyEditor = () => {
	const clx = useStyles();

	const [queues, setQueues] = useState(defaultQueues);
	const [sections, setSections] = useState({});

	// ---------------------- Queue info buttons ----------------------

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

	// ------------------------ Queue handlers -------------------------

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

	// ------------------ Section handlers/selectors -------------------

	//const addFollowUpSection = () => {}; // i.e. to answer

	const getSectionData = (id) => sections[id];

	const updateSectionTitle = (id, title) =>
		setSections({ ...sections, [id]: { ...sections[id], title } });

	const addQuestion = (id) => {
		const newQuestion = { ...defaultQuestion, id: shortid.generate() };
		const questions = [...sections[id].questions, newQuestion];
		setSections({ ...sections, [id]: { ...sections[id], questions } });
	};

	const updateQuestion = (id, data) => {
		console.log({ id, data });
		const questions = sections[id].questions.map((question) =>
			question.id === data.id ? { ...data } : question
		);
		setSections({ ...sections, [id]: { ...sections[id], questions } });
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
						updateSectionTitle,
						deleteSection,
						addQuestion,
						updateQuestion,
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
