import React, { useState, useEffect } from "react";

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

import { useStyles } from "../SurveyEditor-styles";

// ----------------------------------------------------------

export const Section = ({
	id,
	title,
	questions,
	updateTitle,
	addQuestion,
	deleteSection,
}) => {
	const clx = useStyles();

	// --------------------- Editing title --------------------------

	const [newTitle, setNewTitle] = useState(null);

	const isEditingTitle = newTitle !== null;

	const editTitle = (e) => setNewTitle(e.target.value);

	const startEditTitle = (e) => {
		e.stopPropagation();
		setNewTitle(title);
	};

	const endEditTitle = (e) => {
		e.stopPropagation();
		updateTitle(id, newTitle);
		setNewTitle(null);
	};

	useEffect(() => {
		if (!isEditingTitle) return;
		const handleEnter = (e) => (e.key === "Enter" ? endEditTitle(e) : null);
		window.addEventListener("keydown", handleEnter);
		return () => window.removeEventListener("keydown", handleEnter);
	}, [endEditTitle, isEditingTitle]);

	// --------------------- Adding question --------------------------

	const handleAddQuestion = () => addQuestion(id);

	// --------------------------- View ---------------------------

	const titleDisplay = (
		<>
			<Typography variant="h6">{title}</Typography>
			<IconButton children={<EditIcon />} onClick={startEditTitle} />
		</>
	);

	const titleInput = (
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
					onClick={(e) => e.stopPropagation()}
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
			<AccordionSummary
				classes={{ content: clx.accordionSummaryContent }}
				expandIcon={<ExpandMoreIcon />}
				children={isEditingTitle ? titleInput : titleDisplay}
			/>

			<AccordionDetails>
				{/* Questions */}

				{/* New Question button */}
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
