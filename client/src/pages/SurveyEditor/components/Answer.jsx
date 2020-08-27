import React, { useEffect } from "react";
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
			// target: [],
			target: ["initialSection"], // TEMP
		},
	} = answerProps;
	const { after, target } = followUp;
	const answerId = id;
	const {
		deleteAnswer,
		moveAnswer,
		updateAnswer,
		addSectionToSections,
		deleteSectionFromSections,
	} = operations;
	const { getSectionsNamesAndTitles, getSectionData } = selectors;
	const { getNewName } = helpers;

	const sections = getSectionsNamesAndTitles();

	const c = useStyles();

	// --------------------------- Operations ----------------------------

	const curriedOperations = {
		...operations,
		deleteSection: (data) => {
			// deleteSectionFromSections(data);
			// const { sectionName } = data;
			// const e = { target: { name: "nestedTarget", sectionName } };
			// editAnswer(e);
		},
		moveSection: (data) => {}, // local only TODO
	};

	// ------------------------- Edit answer --------------------------

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
	const includeFollowUpInputValue = (newAnswer, e) => {
		let { value } = e.target;
		const prevValue = after;
		if (value.includes("none")) {
			if (!prevValue.includes("none")) value = ["none"];
			else value = value.filter((v) => v !== "none");
		}
		if (value.includes("all")) {
			if (!prevValue.includes("all")) value = ["all"];
			else value = value.filter((v) => v !== "all");
		}
		newAnswer.followUp = { ...followUp, after: value };
	};

	// Push new target section to followUp.target
	const includeFollowUpTarget = (newAnswer, e) => {
		const { sectionName } = e.target;
		newAnswer.followUp = {
			...followUp,
			target: [...target, sectionName],
		};
	};

	// Update answer in store
	// Don't include answerProps with default values (i.e. empty)
	// Include event input in correct format
	const editAnswer = (e) => {
		const { name } = e.target;
		let newAnswer = copyAnswer();
		if (name === "after") includeFollowUpInputValue(newAnswer, e);
		else if (name === "nestedTarget") includeFollowUpTarget(newAnswer, e);
		else includeInputValue(newAnswer, e);
		updateAnswer({ answerId, value: { ...newAnswer } });
	};

	// --------------------------- handlers ----------------------------

	// ISSUE: second function crashes because first one doesn't update store in time
	const handleAddNested = () => {
		const sectionName = getNewName();
		const e = { target: { name: "nestedTarget", sectionName } };
		addSectionToSections({ sectionName });
		editAnswer(e);
		// TODO: addSectioTOSections after rerender when new target comes in from store
	};

	// const sectionNames = sections.map((s) => s.name);
	// console.log(sectionNames);
	// useEffect(() => {
	// 	const newTarget = target.find((t) => !sectionNames.includes(t));
	// 	console.log({ newTarget });
	// 	if (newTarget)
	// }, [target, addSectionToSections]);

	const handleAddLinked = () => {};

	const handleDelete = () => {
		const confirmed = window.confirm("Delete answer?");
		if (confirmed) deleteAnswer({ answerId });
	};

	const handleMoveUp = () => moveAnswer({ answerId, direction: "up" });

	const handleMoveDown = () => moveAnswer({ answerId, direction: "down" });

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
					<MenuItem value={name} key={name}>
						After {title}
					</MenuItem>
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
				{...{ sectionData, isFirst, isLast, selectors }}
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
				<Button children="New Follow-up Reference" onClick={handleAddLinked} />
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
