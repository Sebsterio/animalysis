import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		margin: theme.spacing(1, 0),
	},
	row: {
		marginTop: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
	},
	form: {
		display: "grid",
		gridTemplateColumns: "auto 1fr",
		alignContent: "center",
		alignItems: "center",
		gridGap: theme.spacing(2),
	},
	viewer: {},
}));

// ----------------------------------------------------------

export const Question = ({
	questionProps,
	isFirst,
	isLast,
	updateQuestion,
	deleteQuestion,
}) => {
	const { id, label, type, setsTitle, lengthLimit, answers } = questionProps;

	const clx = useStyles();

	// ---------------------- Editing/presentation view ------------------------

	const [editing, setEditing] = useState(false);
	const startEditing = () => setEditing(true);
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

	// ----------------------------- View ------------------------------

	const labelId = id + "-label";
	const typeId = id + "-type";
	const setsTitleId = id + "-setsTitle";
	const lengthLimitId = id + "-lengthLimit";

	// --- Form ---

	const questionEditView = (
		<Paper className={clx.paper}>
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

				{/* answers */}
			</div>
			<div className={clx.row}>
				<IconButton children={<DoneIcon />} onClick={stopEditing} />
			</div>
		</Paper>
	);

	// --- Viewer ---

	const questionDisplayView = (
		<Paper className={clx.paper}>
			<Typography>{label}</Typography>
			<div className={clx.row}>
				<IconButton children={<DeleteOutlineIcon />} onClick={handleDelete} />
				<IconButton children={<EditIcon />} onClick={startEditing} />
				<IconButton
					children={<ArrowUpwardIcon />}
					onClick={() => {}}
					disabled={isFirst}
				/>
				<IconButton
					children={<ArrowDownwardIcon />}
					onClick={() => {}}
					disabled={isLast}
				/>
			</div>
		</Paper>
	);

	// ---------------

	return editing ? questionEditView : questionDisplayView;
};
