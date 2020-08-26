import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";

import { Division, Answer } from "./index";

import { useStyles } from "../SurveyEditor-styles";

// ----------------------------------------------------------

export const Question = ({ questionProps, isFirst, isLast, operations }) => {
	const { id, label, type, setsTitle, lengthLimit, answers } = questionProps;
	const { updateQuestion, deleteQuestion, moveQuestion } = operations;

	const c = useStyles();

	// ----------------------- Editing question -------------------------

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

	// ---------------------------- Handlers -----------------------------

	const handleDelete = () => {
		const confirmed = window.confirm("Permanently delete question?");
		if (confirmed) deleteQuestion(id);
	};

	// --------------------------- Operations ----------------------------

	const curriedOperations = {
		...operations,
		updateAnswer: () => {},
	};

	// ------------------------------ View -------------------------------

	const labelId = id + "-label";
	const typeId = id + "-type";
	const setsTitleId = id + "-setsTitle";
	const lengthLimitId = id + "-lengthLimit";

	const form = (
		<>
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
		</>
	);

	const fields = answers.map((answerProps, i) => {
		const isFirst = i === 0;
		const isLast = i === answers.length - 1;
		return (
			<Answer
				key={answerProps.id}
				{...{ answerProps, isFirst, isLast }}
				operations={curriedOperations}
			/>
		);
	});

	return (
		<Division
			heading={label}
			fields={fields}
			fieldsType="grid"
			form={form}
			formType="grid"
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDelete}
			handleMoveUp={() => moveQuestion(id, "up")}
			handleMoveDown={() => moveQuestion(id, "down")}
			addButtonText="New Answer"
			handleAddButtonClick={() => {}}
		/>
	);
};
