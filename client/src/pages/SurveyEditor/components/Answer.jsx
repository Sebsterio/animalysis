import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

import { Section, Division } from "./index";

import { useStyles } from "../SurveyEditor-styles";
import {
	makeModifiedAfter,
	makeModifiedTarget,
	makeNestedTargetEvent,
	getAlertMessage,
} from "../SurveyEditor-utils";

// ----------------------------------------------------------

export const Answer = ({
	answerProps,
	isFirst,
	isLast,
	operations,
	selectors,
	helpers,
}) => {
	const {
		id,
		text,
		print = "",
		printNote = "",
		alert = 0,
		followUp = {
			after: ["none"],
			target: [],
		},
	} = answerProps;

	const answerId = id;
	const { after, target } = followUp;

	const {
		deleteAnswer,
		moveAnswer,
		updateAnswer,
		addSectionToSections,
		deleteSectionFromSections,
	} = operations;

	const {
		getSectionsNamesAndTitles,
		getSectionData,
		getOptionalQueue,
	} = selectors;

	const sections = getSectionsNamesAndTitles();
	const optionalQueue = getOptionalQueue();
	const optionalQueueEmpty = !optionalQueue.length;

	const { getNewName } = helpers;

	const c = useStyles();

	// --------------------- Edit answer handler ----------------------

	// Include non-empty answerProps in data to submit
	const copyAnswer = () => {
		let newAnswer = { id, text };
		if (print !== "") newAnswer.print = print;
		if (printNote !== "") newAnswer.printNote = printNote;
		if (alert !== 0) newAnswer.alert = alert;
		if (!!target.length) newAnswer.followUp = { after, target };
		return newAnswer;
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
	const includeFollowUpAfter = (newAnswer, e) => {
		newAnswer.followUp = { ...followUp, after: makeModifiedAfter(e, after) };
	};

	// Add/delete/move target section in followUp.target in response to event
	const includeFollowUpTarget = (newAnswer, e) => {
		newAnswer.followUp = { ...followUp, target: makeModifiedTarget(e, target) };
	};

	// Update answer in store
	// Don't include answerProps with default values (i.e. empty)
	// Include event input in correct format
	const editAnswer = (e) => {
		const { name } = e.target;
		let newAnswer = copyAnswer();
		if (name === "after") includeFollowUpAfter(newAnswer, e);
		else if (name === "target") includeFollowUpTarget(newAnswer, e);
		else includeInputValue(newAnswer, e);
		updateAnswer({ answerId, value: { ...newAnswer } });
	};

	// ------------------------ Other handlers -------------------------

	const handleAddNested = () => {
		const sectionName = getNewName();
		addSectionToSections({ sectionName });
		editAnswer(makeNestedTargetEvent("add", sectionName));
	};

	const handleAddLinked = () => {
		const sectionName = optionalQueue[0];
		editAnswer(makeNestedTargetEvent("add", sectionName));
	};

	const handleDelete = () => {
		const confirmed = window.confirm("Delete answer?");
		if (confirmed) deleteAnswer({ answerId });
	};

	const handleMoveUp = () => moveAnswer({ answerId, direction: "up" });

	const handleMoveDown = () => moveAnswer({ answerId, direction: "down" });

	// ----------------- Drilled props modifications ------------------

	const curriedOperations = {
		...operations,
		deleteSection: ({ sectionName }) => {
			deleteSectionFromSections({ sectionName });
			editAnswer(makeNestedTargetEvent("delete", sectionName));
		},
		moveSection: ({ sectionName, direction }) =>
			editAnswer(makeNestedTargetEvent("move", sectionName, direction)),
	};

	// ----------------------------- View ------------------------------

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
				name="after"
				value={after}
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
					<MenuItem value={name} key={name} children={"After " + title} />
				))}
			</TextField>
		</>
	);

	const fields = target.map((t, i) => {
		const sectionData = getSectionData(t);

		if (!sectionData) return "ERROR";

		const isFirst = i === 0;
		const isLast = i === target.length - 1;
		return (
			<Section
				key={t}
				sectionName={t}
				{...{ sectionData, isFirst, isLast, selectors, helpers }}
				operations={curriedOperations}
			/>
		);
	});

	const fieldsFooter = (
		<ButtonGroup fullWidth variant="outlined">
			<Tooltip title="Create a new section within the answer.">
				<Button children="New Nested Follow-up" onClick={handleAddNested} />
			</Tooltip>
			<Tooltip title="Choose an existing section from Optional Queue. If reached, it will get removed from Optional Queue.">
				<Button
					children="New Follow-up Reference"
					onClick={handleAddLinked}
					disabled={optionalQueueEmpty}
				/>
			</Tooltip>
		</ButtonGroup>
	);

	return (
		<Division
			heading={text}
			headingPrefix="A"
			body={body}
			fields={fields}
			fieldsFooter={fieldsFooter}
			form={form}
			formType="grid"
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDelete}
			handleMoveUp={handleMoveUp}
			handleMoveDown={handleMoveDown}
		/>
	);
};
