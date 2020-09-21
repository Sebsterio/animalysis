import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import { FileInput } from "components/FileInput";
import { Division, Answer } from "./index";

import { includeInputValue } from "../SurveyEditor-utils";

// ------------------------------------------------------------------

export const Question = ({
	questionProps,
	isFirst,
	isLast,
	operations,
	selectors,
}) => {
	const {
		id,
		label,
		type,
		imageUrl,
		description,
		setsTitle = false,
		lengthLimit = 0,
		answers = [],
	} = questionProps;

	const questionId = id;

	const {
		updateQuestion,
		deleteQuestion,
		moveQuestion,
		addAnswer,
		deleteAnswer,
		moveAnswer,
		updateAnswer,
	} = operations;

	// --------------------- Edit-question handler ----------------------

	const copyQuestion = () => {
		let newQuestion = { id, label, type, answers };
		if (imageUrl) newQuestion.imageUrl = imageUrl;
		if (description) newQuestion.description = description;
		if (type === "text") {
			if (setsTitle) newQuestion = { ...newQuestion, setsTitle };
			if (lengthLimit > 0) newQuestion = { ...newQuestion, lengthLimit };
		}
		return newQuestion;
	};

	// Update question in store
	// Don't include questionProps with default values (i.e. empty)
	// Include event input in correct format
	const editQuestion = (e) => {
		let newQuestion = copyQuestion();
		includeInputValue(newQuestion, e);
		updateQuestion({ questionId, value: newQuestion });
	};

	// ------------------------- Other handlers --------------------------

	const handleDeleteQuestion = () => {
		const confirmed = window.confirm("Permanently delete question?");
		if (confirmed) deleteQuestion({ questionId });
	};

	const handleAddAnswer = () => addAnswer({ questionId });

	const handleMoveQuestionUp = () =>
		moveQuestion({ questionId, direction: "up" });

	const handleMoveQuestionDown = () =>
		moveQuestion({ questionId, direction: "down" });

	// ------------------ Drilled props modifications ------------------

	const modifiedOperations = {
		...operations,
		deleteAnswer: (data) => deleteAnswer({ questionId, ...data }),
		moveAnswer: (data) => moveAnswer({ questionId, ...data }),
		updateAnswer: (data) => updateAnswer({ questionId, ...data }),
	};

	// ------------------------------ View -------------------------------

	// Config editor

	const labelId = id + "-label";
	const typeId = id + "-type";
	const setsTitleId = id + "-setsTitle";
	const lengthLimitId = id + "-lengthLimit";
	const desciptionId = id + "-desciption";
	const removeImageId = id + "-removeImage";

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
						name="setsTitle"
						checked={setsTitle}
						inputProps={{ id: setsTitleId }}
						onChange={editQuestion}
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

			{/* File upload */}
			<Typography component="label" children="Image" />
			{!imageUrl ? (
				<FileInput
					label="Upload "
					name="imageUrl"
					onChange={editQuestion}
					variant="outlined"
				/>
			) : (
				<div style={{ display: "flex", flexFlow: "row nowrap" }}>
					<FileInput
						label="Change"
						name="imageUrl"
						onChange={editQuestion}
						variant="outlined"
						fullWidth
					/>
					<input
						type="submit"
						name="imageUrl"
						value=""
						onClick={editQuestion}
						id={removeImageId}
						hidden
					/>
					<label htmlFor={removeImageId} style={{ width: "100%" }}>
						<Button
							children="Remove"
							component="span"
							variant="outlined"
							fullWidth
						/>
					</label>
				</div>
			)}

			{/* description */}
			<Typography component="label" htmlFor={desciptionId} children="Caption" />
			<TextField
				fullWidth
				name="description"
				value={description}
				inputProps={{ id: desciptionId }}
				onChange={editQuestion}
			/>
		</>
	);

	// Fields editor

	const fields = answers.map((answerProps, i) => (
		<Answer
			key={answerProps.id}
			isFirst={i === 0}
			isLast={i === answers.length - 1}
			operations={modifiedOperations}
			{...{ answerProps, selectors }}
		/>
	));

	const fieldsFooter = (
		<Button
			fullWidth
			variant="outlined"
			children="New Answer"
			onClick={handleAddAnswer}
		/>
	);

	// -------------

	return (
		<Division
			backgroundColor="rgba(0,0,0,0.03)"
			heading={label}
			headingPrefix="Q"
			fields={fields}
			fieldsType="grid"
			fieldsFooter={fieldsFooter}
			fieldsButtonDisabled={type === "text"}
			form={form}
			formType="grid"
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDeleteQuestion}
			handleMoveUp={handleMoveQuestionUp}
			handleMoveDown={handleMoveQuestionDown}
		/>
	);
};
