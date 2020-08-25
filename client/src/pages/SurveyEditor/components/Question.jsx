import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";

import shortid from "shortid";

export const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		margin: theme.spacing(1, 0),
		display: "grid",
		gridTemplateColumns: "auto 1fr",
		alignContent: "center",
		alignItems: "center",
		gridGap: theme.spacing(2),
	},
}));

// ----------------------------------------------------------

export const Question = ({ questionProps }) => {
	const clx = useStyles();

	const [newQuestion, setNewQuestion] = useState({
		...questionProps,
		setsTitle: questionProps.setsTitle || false,
		lengthLimit: questionProps.lengthLimit || 0,
	});

	const editNewQuestion = (e) => {
		let { type, name, value, checked } = e.target;
		if (type === "number") value = Number(value);
		else if (checked !== undefined) value = checked;
		setNewQuestion({ ...newQuestion, [name]: value });
	};

	// updateQuestion - discard type=text specific props if diffferent type

	const { label, type, setsTitle, lengthLimit, answers } = newQuestion;

	const id = shortid.generate();
	const labelId = id + "-label";
	const typeId = id + "-type";
	const setsTitleId = id + "-setsTitle";
	const lengthLimitId = id + "-lengthLimit";

	return (
		<Paper className={clx.paper}>
			{/* Label */}
			<Typography component="label" htmlFor={labelId} children="Label" />
			<TextField
				autoFocus
				fullWidth
				multiline
				name="label"
				value={label}
				inputProps={{ id: labelId }}
				onChange={editNewQuestion}
			/>

			{/* Type */}
			<Typography component="label" htmlFor={typeId} children="Type" />
			<TextField
				select
				fullWidth
				name="type"
				value={type}
				inputProps={{ id: typeId }}
				onChange={editNewQuestion}
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
						onChange={editNewQuestion}
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
						onChange={editNewQuestion}
					/>
				</>
			)}

			{/* answers */}
		</Paper>
	);
};
