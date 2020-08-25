import React, { useState, useEffect, useCallback } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { Question } from "./index";

import { useStyles } from "../SurveyEditor-styles";
import { stopPropagation } from "../SurveyEditor-utils";

// ----------------------------------------------------------

export const Section = ({
	sectionId,
	isFirst,
	isLast,
	// sectionData
	title,
	questions,
	// handlers
	updateTitle,
	deleteSection,
	moveSection,
	// drilled props
	addQuestion,
	updateQuestion,
	deleteQuestion,
}) => {
	const clx = useStyles();

	// ----------------------- Edit title ---------------------------

	const [newTitle, setNewTitle] = useState(null);

	const isEditingTitle = newTitle !== null;

	const editTitle = (e) => setNewTitle(e.target.value);

	const startEditTitle = (e) => {
		e.stopPropagation();
		setNewTitle(title);
	};

	const endEditTitle = useCallback(
		(e) => {
			e.stopPropagation();
			updateTitle(sectionId, newTitle);
			setNewTitle(null);
		},
		[sectionId, newTitle, updateTitle]
	);

	useEffect(() => {
		if (!isEditingTitle) return;
		const handleEnter = (e) => e.key === "Enter" && endEditTitle(e);
		window.addEventListener("keydown", handleEnter);
		return () => window.removeEventListener("keydown", handleEnter);
	}, [isEditingTitle, endEditTitle]);

	// --------------------- Section handlers --------------------------

	const handleDelete = (e) => {
		e.stopPropagation();
		const confirmed = window.confirm("Permanently delete the ENTIRE section?");
		if (confirmed) deleteSection(sectionId);
	};

	const handleMoveUp = (e) => {
		e.stopPropagation();
		moveSection(sectionId, "up");
	};

	const handleMoveDown = (e) => {
		e.stopPropagation();
		moveSection(sectionId, "down");
	};

	// --------------------- Question handlers --------------------------

	const handleAddQuestion = () => addQuestion(sectionId);

	const handleUpdateQuestion = (data) => updateQuestion(sectionId, data);

	const handleDeleteQuestion = (questionId) =>
		deleteQuestion(sectionId, questionId);

	// --------------------------- View ---------------------------

	const titleDisplayView = (
		<div className={clx.col}>
			<Typography variant="h6">{title}</Typography>
			<div className={clx.row}>
				<IconButton children={<DeleteOutlineIcon />} onClick={handleDelete} />
				<IconButton children={<EditIcon />} onClick={startEditTitle} />
				<IconButton
					children={<ArrowUpwardIcon />}
					onClick={handleMoveUp}
					disabled={isFirst}
				/>
				<IconButton
					children={<ArrowDownwardIcon />}
					onClick={handleMoveDown}
					disabled={isLast}
				/>
			</div>
		</div>
	);

	const titleEditView = (
		<>
			<ClickAwayListener
				mouseEvent="onMouseDown"
				touchEvent="onTouchStart"
				onClickAway={endEditTitle}
			>
				<TextField
					autoFocus
					value={newTitle}
					onChange={editTitle}
					onClick={stopPropagation}
				/>
			</ClickAwayListener>
			<IconButton children={<DoneIcon />} onClick={endEditTitle} />
		</>
	);

	return (
		<Accordion
			className={clx.accordion}
			TransitionProps={{ unmountOnExit: true }}
		>
			{/* ------------------- Head ------------------- */}

			<AccordionSummary
				classes={{ content: clx.accordionSummaryContent }}
				expandIcon={<ExpandMoreIcon />}
			>
				{isEditingTitle ? titleEditView : titleDisplayView}
			</AccordionSummary>

			{/* --------------- Questions list -------------- */}

			<AccordionDetails
				className={clx.accordionDetails}
				children={questions.map((questionProps, i) => {
					const isFirst = i === 0;
					const isLast = i === questions.length - 1;
					return (
						<Question
							key={questionProps.id}
							{...{ questionProps, isFirst, isLast }}
							updateQuestion={handleUpdateQuestion}
							deleteQuestion={handleDeleteQuestion}
						/>
					);
				})}
			/>

			{/* ------------ New Question button ------------ */}

			<AccordionDetails>
				<Button
					fullWidth
					variant="outlined"
					children="New Question"
					onClick={handleAddQuestion}
				/>
			</AccordionDetails>
		</Accordion>
	);
};
