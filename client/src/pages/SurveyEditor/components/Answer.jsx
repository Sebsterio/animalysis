import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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

	const { updateAnswer } = operations;

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

	// const handleDelete = () => {
	// 	const confirmed = window.confirm("Permanently delete question?");
	// 	if (confirmed) deleteQuestion(id);
	// };

	// const handleMoveUp = () => moveQuestion(id, "up");

	// const handleMoveDown = () => moveQuestion(id, "down");

	// ----------------------------- View ------------------------------

	const textlId = id + "-text";
	const printId = id + "-print";
	const printNoteId = id + "-printNote";
	const alertId = id + "-alert";
	const followUpId = id + "-followUp";

	return (
		<Paper className={c.division}>
			<div className={c.form}>
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
					children="Print Note"
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
			</div>
		</Paper>
	);
};
