import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

import { Section, Division } from "./index";

import { useStyles } from "../SurveyEditor-styles";

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
			after: ["none"],
			// target: [],
			target: ["initialSection"], // TEMP
		},
	} = answerProps;

	const { deleteAnswer, moveAnswer, updateAnswer } = operations;
	const { getSectionsNamesAndTitles, getSectionData } = selectors;

	const sections = getSectionsNamesAndTitles();

	const c = useStyles();

	// ------------------------- Edit answer --------------------------

	// Include non-empty answerProps in data to submit
	const copyAnswer = () => {
		let newQuestion = { id, text };
		if (print !== "") newQuestion.print = print;
		if (printNote !== "") newQuestion.printNote = printNote;
		if (alert !== 0) newQuestion.alert = alert;
		if (!!followUp.target.length)
			newQuestion.followUp = {
				after: followUp.after,
				target: followUp.target,
			};
		return newQuestion;
	};

	// Choose correct input prop and convert format if needed
	const includeInputValue = (newAnswer, e) => {
		let { type, name, value, checked } = e.target;
		if (type === "number") value = Number(value);
		else if (type === "checkbox") value = checked;
		newAnswer[name] = value;
	};

	// Selecting 'none' or 'all' deselects all other options
	// Selecting any other option, deselects 'none' and 'all'
	const includeFollowUpInputValue = (newAnswer, e) => {
		let { value } = e.target;
		const prevValue = followUp.after;
		if (value.includes("none")) {
			if (!prevValue.includes("none")) value = ["none"];
			else value = value.filter((v) => v !== "none");
		}
		if (value.includes("all")) {
			if (!prevValue.includes("none")) value = ["all"];
			else value = value.filter((v) => v !== "all");
		}
		newAnswer.followUp = { ...followUp, after: value };
	};

	// Update answer in store
	// Don't include answerProps with default values (i.e. empty)
	// Include event input in correct format
	const editAnswer = (e) => {
		const { name } = e.target;
		let newAnswer = copyAnswer();
		if (name === "followUp") includeFollowUpInputValue(newAnswer, e);
		else includeInputValue(newAnswer, e);
		updateAnswer(id, newAnswer);
	};

	// --------------------------- handlers ----------------------------

	const handleDelete = () => {
		const confirmed = window.confirm("Delete answer?");
		if (confirmed) deleteAnswer(id);
	};

	// --------------------------- Operations ----------------------------

	const curriedOperations = {
		...operations,
		// updateQuestion: (id, data) => updateQuestion(sectionName, id, data),
		// deleteQuestion: (questionId) => deleteQuestion(sectionName, questionId),
		// moveQuestion: (questionId, direction) =>
		// 	moveQuestion(sectionName, questionId, direction),
		// addAnswer: (questionId) => addAnswer(sectionName, questionId),
		// deleteAnswer: (questionId, id) => deleteAnswer(sectionName, questionId, id),
		// moveAnswer: (qId, aId, dir) => moveAnswer(sectionName, qId, aId, dir),
		// updateAnswer: (qId, aId, val) => updateAnswer(sectionName, qId, aId, val),
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

			{/* followUp after*/}

			<Tooltip title="If chosen section is already completed, the follow-up will appear after this question.">
				<Typography
					component="label"
					htmlFor={followUpId}
					children="Follow-up"
				/>
			</Tooltip>
			<TextField
				select
				SelectProps={{ multiple: true }}
				fullWidth
				name="followUp"
				value={followUp.after}
				inputProps={{ id: followUpId }}
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
						After {title}
					</MenuItem>
				))}
			</TextField>
		</>
	);

	const fields = followUp.target.map((target, i) => {
		const sectionData = getSectionData(target);
		const isFirst = i === 0;
		const isLast = i === followUp.target.length - 1;
		return (
			<Section
				key={target}
				sectionName={target}
				{...{ sectionData, isFirst, isLast, selectors }}
				operations={curriedOperations}
			/>
		);
	});

	const fieldsFooter = (
		<ButtonGroup fullWidth variant="outlined">
			<Tooltip title="Create a new section.">
				<Button children="New Nested Section" onClick={() => {}} />
			</Tooltip>
			<Tooltip title="Choose an existing section from the Optional Queue. If reached, it will get removed from Optional Queue.">
				<Button children="New Section Reference" onClick={() => {}} />
			</Tooltip>
		</ButtonGroup>
	);

	return (
		<Division
			heading={text}
			body={body}
			fieldsHeader="Follow-up sections:"
			fields={fields}
			fieldsFooter={fieldsFooter}
			form={form}
			formType="grid"
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDelete}
			handleMoveUp={() => moveAnswer(id, "up")}
			handleMoveDown={() => moveAnswer(id, "down")}
		/>
	);
};
