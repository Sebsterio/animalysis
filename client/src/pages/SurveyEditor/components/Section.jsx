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
	moveQuestion,
}) => {
	const clx = useStyles();

	// ---------------------- Editing/presentation view ------------------------

	const [editing, setEditing] = useState(false);
	const editConfig = () => setEditing("config");
	const editQuestions = () => setEditing("questions");
	const stopEditing = () => setEditing(false);

	// --------------------- Section handlers --------------------------

	const handleTitleInput = (e) => updateTitle(sectionId, e.target.value);

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

	const handleMoveQuestion = (questionId, direction) =>
		moveQuestion(sectionId, questionId, direction);

	// --------------------------- View ---------------------------

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
								updateQuestion={handleUpdateQuestion}
								deleteQuestion={handleDeleteQuestion}
								moveQuestion={handleMoveQuestion}
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
					onClick={handleAddQuestion}
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
				<IconButton children={<DeleteOutlineIcon />} onClick={handleDelete} />
				<IconButton children={<EditIcon />} onClick={editConfig} />
				<IconButton children={<QuestionAnswerIcon />} onClick={editQuestions} />

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
		</Paper>
	);

	return editing === "config"
		? configEditor
		: editing === "questions"
		? questionsEditor
		: viewer;
};
