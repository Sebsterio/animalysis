import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { Question } from "./index";

import { useStyles } from "../SurveyEditor-styles";

// ----------------------------------------------------------

export const Section = ({
	sectionName,
	sectionData: { title, questions },
	isFirst,
	isLast,
	operations,
}) => {
	const {
		modifySectionTitle,
		deleteSection,
		moveSection,
		addQuestion,
		updateQuestion,
		deleteQuestion,
		moveQuestion,
	} = operations;

	const clx = useStyles();

	// ----------------- Editing/presentation view ---------------------

	const [editing, setEditing] = useState(false);
	const editConfig = () => setEditing("config");
	const editQuestions = () => setEditing("questions");
	const stopEditing = () => setEditing(false);

	// ------------------------- Handlers ------------------------------

	const handleDeleteButtonClick = () => {
		const confirmed = window.confirm("Permanently delete the ENTIRE section?");
		if (confirmed) deleteSection(sectionName);
	};

	const handleMoveUpButtonClick = () => moveSection(sectionName, "up");

	const handleMoveDownButtonClick = () => moveSection(sectionName, "down");

	const handleTitleInput = (e) =>
		modifySectionTitle(sectionName, e.target.value);

	const handleAddQuestionButtonClick = () => addQuestion(sectionName);

	// ------------------------ Operations -----------------------------

	const curriedOperations = {
		...operations,
		updateQuestion: (data) => updateQuestion(sectionName, data),
		deleteQuestion: (questionId) => deleteQuestion(sectionName, questionId),
		moveQuestion: (questionId, direction) =>
			moveQuestion(sectionName, questionId, direction),
	};

	// --------------------------- View -------------------------------

	// --- Config editor ---

	const configEditor = (
		<Paper className={clx.innerPaper}>
			<div className={clx.row}>
				<TextField
					autoFocus
					fullWidth
					value={title}
					onChange={handleTitleInput}
					className={clx.heading}
				/>
				<IconButton children={<DoneIcon />} onClick={stopEditing} />
			</div>
		</Paper>
	);

	// --- Questions editor ---

	const questionsEditor = (
		<Paper className={clx.innerPaper}>
			<Typography variant="h6" className={clx.heading}>
				{title}
			</Typography>

			{!!questions.length && (
				<div className={clx.group}>
					{questions.map((questionProps, i) => {
						const isFirst = i === 0;
						const isLast = i === questions.length - 1;
						return (
							<Question
								key={questionProps.id}
								{...{ questionProps, isFirst, isLast }}
								operations={curriedOperations}
							/>
						);
					})}
				</div>
			)}

			<div className={clx.row}>
				<Button
					fullWidth
					variant="outlined"
					children="New Question"
					onClick={handleAddQuestionButtonClick}
				/>
				<IconButton children={<DoneIcon />} onClick={stopEditing} />
			</div>
		</Paper>
	);

	// --- Viewer ---

	const viewer = (
		<Paper className={clx.innerPaper}>
			<Typography variant="h6" className={clx.heading}>
				{title}
			</Typography>

			<div className={clx.row}>
				<IconButton
					children={<DeleteOutlineIcon />}
					onClick={handleDeleteButtonClick}
				/>
				<IconButton children={<EditIcon />} onClick={editConfig} />
				<IconButton children={<QuestionAnswerIcon />} onClick={editQuestions} />

				<IconButton
					children={<ArrowUpwardIcon />}
					onClick={handleMoveUpButtonClick}
					disabled={isFirst}
				/>
				<IconButton
					children={<ArrowDownwardIcon />}
					onClick={handleMoveDownButtonClick}
					disabled={isLast}
				/>
			</div>
		</Paper>
	);

	return editing === "config"
		? configEditor
		: editing === "questions"
		? questionsEditor
		: viewer;
};
