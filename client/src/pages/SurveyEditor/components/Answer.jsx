import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

import { Division } from "./index";

import { useStyles } from "../SurveyEditor-styles";
import { isEmpty } from "utils/object";

// ----------------------------------------------------------

export const Answer = ({ answerProps, isFirst, isLast, operations }) => {
	const {
		id,
		text,
		print = "",
		printNote = "",
		alert = 0,
		followUp = {},
	} = answerProps;
	// followUp: {
	// 	target: "nose_exam",
	// 	after: "all",
	// },

	const { deleteAnswer, moveAnswer, updateAnswer } = operations;

	const c = useStyles();

	// ---------------------- Edit answer ------------------------

	const copyAnswer = () => {
		let newQuestion = { id, text };
		if (print !== "") newQuestion.print = print;
		if (printNote !== "") newQuestion.printNote = printNote;
		if (alert !== 0) newQuestion.alert = alert;
		if (!isEmpty(followUp)) newQuestion.followUp = followUp;
		return newQuestion;
	};

	const includeInputValue = (newAnswer, e) => {
		let { type, name, value, checked } = e.target;
		if (type === "number") value = Number(value);
		else if (checked !== undefined) value = checked;
		newAnswer[name] = value;
	};

	const editAnswer = (e) => {
		let newAnswer = copyAnswer();
		includeInputValue(newAnswer, e);
		updateAnswer(newAnswer);
	};

	// --------------------------- handlers ----------------------------

	const handleDelete = () => {
		const confirmed = window.confirm("Delete answer?");
		if (confirmed) deleteAnswer(id);
	};

	// ----------------------------- View ------------------------------

	// prettier-ignore
	const getAlertMessage = (alertCode) => {
		switch (alertCode) {
			case 1:	return "green";
			case 2:	return "yellow";
			case 3:	return "orange";
			case 4:	return "red";
			default: return "none";
		}
	};

	const body =
		print || printNote || alert ? (
			<div className={c.mTop1}>
				{print && (
					<Typography component="div" variant="caption">
						Print: {print}
					</Typography>
				)}
				{printNote && (
					<Typography component="div" variant="caption">
						Print-note: {printNote}
					</Typography>
				)}
				{alert && (
					<Typography component="div" variant="caption">
						Alert: {getAlertMessage(alert)}
					</Typography>
				)}
			</div>
		) : null;

	const textlId = id + "-text";
	const printId = id + "-print";
	const printNoteId = id + "-printNote";
	const alertId = id + "-alert";
	// const followUpId = id + "-followUp";

	const form = (
		<>
			{/* text */}
			<Typography component="label" htmlFor={textlId} children="Text" />
			<TextField
				autoFocus
				fullWidth
				multiline
				name="text"
				value={text}
				inputProps={{ id: textlId }}
				onChange={editAnswer}
			/>

			{/* print */}
			<Typography component="label" htmlFor={printId} children="Print" />
			<TextField
				fullWidth
				name="print"
				value={print}
				inputProps={{ id: printId }}
				onChange={editAnswer}
			/>

			{/* printNote */}
			<Typography
				component="label"
				htmlFor={printNoteId}
				children="Print-note"
			/>
			<TextField
				fullWidth
				name="printNote"
				value={printNote}
				inputProps={{ id: printNoteId }}
				onChange={editAnswer}
			/>

			{/* alert */}
			<Typography component="label" htmlFor={alertId} children="Alert" />
			<TextField
				select
				fullWidth
				name="alert"
				value={alert}
				inputProps={{ id: alertId }}
				onChange={editAnswer}
			>
				<MenuItem value={1}>Green</MenuItem>
				<MenuItem value={2}>Yellow</MenuItem>
				<MenuItem value={3}>Orange</MenuItem>
				<MenuItem value={4}>Red</MenuItem>
			</TextField>
		</>
	);

	return (
		<Division
			heading={text}
			body={body}
			form={form}
			formType="grid"
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDelete}
			handleMoveUp={() => moveAnswer(id, "up")}
			handleMoveDown={() => moveAnswer(id, "down")}
			addButtonText="New Answer"
			handleAddButtonClick={() => {}}
		/>
	);
};
