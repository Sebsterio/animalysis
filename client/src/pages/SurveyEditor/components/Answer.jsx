import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";

import { Division } from "./index";

import { useStyles } from "../SurveyEditor-styles";
import { isEmpty } from "utils/object";

// ----------------------------------------------------------

export const Answer = ({
	answerProps,
	isFirst,
	isLast,
	operations,
	selectors,
}) => {
	const {
		id,
		text,
		print = "",
		printNote = "",
		alert = 0,
		followUp = {
			after: [], // ['none'] | "all" | (Str | [Str]: sectionName(s))
			target: "", // (Str | [Str]: sectionName),
		},
	} = answerProps;

	const { deleteAnswer, moveAnswer, updateAnswer } = operations;
	const { getSectionsNamesAndTitles } = selectors;
	const sections = getSectionsNamesAndTitles();

	const c = useStyles();

	const [editingFollowUp, setEditingFollowup] = useState(false);
	const updateEditingFollowup = (e) => setEditingFollowup(e.target.checked);

	// ------------------------- Edit answer --------------------------

	const copyAnswer = () => {
		let newQuestion = { id, text };
		if (print !== "") newQuestion.print = print;
		if (printNote !== "") newQuestion.printNote = printNote;
		if (alert !== 0) newQuestion.alert = alert;
		if (followUp.target)
			newQuestion.followUp = {
				after: followUp.after,
				target: followUp.target,
			};
		return newQuestion;
	};

	const includeInputValue = (newAnswer, e) => {
		let { type, name, value, checked } = e.target;
		if (type === "number") value = Number(value);
		else if (type === "checkbox") value = checked;
		newAnswer[name] = value;
	};

	const includeFollowUpInputValue = (newAnswer, e) => {
		let { name, value } = e.target;
		if (value.includes("none")) value = ["none"];
		if (value.includes("all")) value = ["all"];
		newAnswer.followUp = { ...followUp, [name]: value };
	};

	const editAnswer = (e) => {
		const { name } = e.target;
		let newAnswer = copyAnswer();
		if (name === "after") includeFollowUpInputValue(newAnswer, e);
		else includeInputValue(newAnswer, e);
		updateAnswer(id, newAnswer);
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
	const followUpId = id + "-followUp";
	const followUpAfterId = id + "-followUp-after";
	// const followUpTargetId = id + '-followUp-target'

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

			{/* followUp */}
			<Typography component="label" htmlFor={followUpId} children="Follow-up" />
			<Switch
				name="followUp"
				checked={editingFollowUp}
				inputProps={{ id: followUpId }}
				onChange={updateEditingFollowup}
			/>

			{/* followUp after*/}
			{editingFollowUp && (
				<>
					<Typography
						component="label"
						htmlFor={followUpAfterId}
						children="When"
					/>
					<TextField
						select
						SelectProps={{ multiple: true }}
						fullWidth
						name="after"
						value={followUp.after}
						inputProps={{ id: followUpAfterId }}
						onChange={editAnswer}
					>
						<MenuItem value={"none"} className={c.bold}>
							After this question
						</MenuItem>
						<MenuItem value={"all"} className={c.bold}>
							At the end of this queue
						</MenuItem>
						{/* TODO: map sectionNames */}
						{sections.map(({ name, title }) => (
							<MenuItem value={name} key={name}>
								{title}
							</MenuItem>
						))}
					</TextField>
				</>
			)}
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
		/>
	);
};
