import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { Answer } from "./index";

import { useStyles } from "../SurveyEditor-styles";

// ----------------------------------------------------------

export const Question = ({
	questionProps,
	isFirst,
	isLast,
	updateQuestion,
	deleteQuestion,
	moveQuestion,
}) => {
	const { id, label, type, setsTitle, lengthLimit, answers } = questionProps;

	const clx = useStyles();

	// ---------------------- Editing/presentation view ------------------------

	const [editing, setEditing] = useState(false);
	const editConfig = () => setEditing("config");
	const editAnswers = () => setEditing("answers");
	const stopEditing = () => setEditing(false);

	// ---------------------- Editing question ------------------------

	const copyQuestion = () => {
		let newQuestion = { id, label, type, answers };
		if (type === "text")
			newQuestion = { ...newQuestion, setsTitle, lengthLimit };
		return newQuestion;
	};

	const includeInputValue = (newQuestion, e) => {
		let { type, name, value, checked } = e.target;
		if (type === "number") value = Number(value);
		else if (checked !== undefined) value = checked;
		newQuestion[name] = value;
	};

	const editQuestion = (e) => {
		let newQuestion = copyQuestion();
		includeInputValue(newQuestion, e);
		updateQuestion(newQuestion);
	};

	// --------------------------- handlers ----------------------------

	const handleDelete = () => {
		const confirmed = window.confirm("Permanently delete question?");
		if (confirmed) deleteQuestion(id);
	};

	const handleMoveUp = () => moveQuestion(id, "up");

	const handleMoveDown = () => moveQuestion(id, "down");

	const handleAddAnswer = () => {};

	// ----------------------------- View ------------------------------

	const labelId = id + "-label";
	const typeId = id + "-type";
	const setsTitleId = id + "-setsTitle";
	const lengthLimitId = id + "-lengthLimit";

	// --- Config editor ---

	const configEditor = (
		<Paper className={clx.innerPaper}>
			<div className={clx.form}>
				{/* Label */}
				<Typography component="label" htmlFor={labelId} children="Question" />
				<TextField
					autoFocus
					fullWidth
					multiline
					name="label"
					value={label}
					inputProps={{ id: labelId }}
					onChange={editQuestion}
				/>

				{/* Type */}
				<Typography component="label" htmlFor={typeId} children="Type" />
				<TextField
					select
					fullWidth
					name="type"
					value={type}
					inputProps={{ id: typeId }}
					onChange={editQuestion}
				>
					<MenuItem value="text">Text</MenuItem>
					<MenuItem value="select-one">Select one</MenuItem>
					<MenuItem value="select-multiple">Select multiple</MenuItem>
				</TextField>

				{type === "text" && (
					<>
						{/* setsTitle */}
						<Typography
							component="label"
							htmlFor={setsTitleId}
							children="Sets title"
						/>
						<Switch
							checked={setsTitle}
							onChange={editQuestion}
							name="setsTitle"
						/>

						{/* lengthLimit */}
						<Typography
							component="label"
							htmlFor={lengthLimitId}
							children="Length limit"
						/>
						<TextField
							fullWidth
							type="number"
							name="lengthLimit"
							value={lengthLimit}
							inputProps={{ id: lengthLimitId }}
							onChange={editQuestion}
						/>
					</>
				)}
			</div>
			<div className={clx.row}>
				<IconButton children={<DoneIcon />} onClick={stopEditing} />
			</div>
		</Paper>
	);

	// --- Answers editor ---

	const answersEditor = (
		<Paper className={clx.innerPaper}>
			<Typography className={clx.heading}>{label}</Typography>
			{!!answers.length && (
				<div className={clx.group}>
					{answers.map((answerProps, i) => {
						answerProps.isFirst = i === 0;
						answerProps.isLast = i === answers.length - 1;
						const handlers = {
							updateAnswer: () => {},
						};
						return (
							<Answer key={answerProps.id} {...{ answerProps, handlers }} />
						);
					})}
				</div>
			)}
			<div className={clx.row}>
				<Button
					fullWidth
					variant="outlined"
					children="New Answer"
					onClick={handleAddAnswer}
				/>
				<IconButton children={<DoneIcon />} onClick={stopEditing} />
			</div>
		</Paper>
	);

	// --- Viewer ---

	const viewer = (
		<Paper className={clx.innerPaper}>
			<Typography className={clx.heading}>{label}</Typography>
			<div className={clx.row}>
				<IconButton children={<DeleteOutlineIcon />} onClick={handleDelete} />
				<IconButton children={<EditIcon />} onClick={editConfig} />
				<IconButton
					children={<QuestionAnswerIcon />}
					onClick={editAnswers}
					disabled={type === "text"}
				/>

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

	// ---------------

	return editing === "config"
		? configEditor
		: editing === "answers"
		? answersEditor
		: viewer;
};
