import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

import { Section, Division } from "./index";

import { useStyles } from "../SurveyEditor-styles";
import {
	includeInputValue,
	makeModifiedAfter,
	makeModifiedTarget,
	makeNestedTargetEvent,
	getAlertMessage,
} from "../SurveyEditor-utils";
import {
	message_optionalQueueIsEmpty,
	message_allOptionalSectionsAdded,
} from "../SurveyEditor-defaults";

// -------------- This is the result of notusing Redux... --------------

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
			after: ["none"], // TODO: rename to "targets"
			target: [], // TODO: rename to "sections"
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
		showPopover,
	} = operations;

	const {
		getSectionsNamesAndTitles,
		getSectionData,
		getOptionalQueueNamesAndTitles,
	} = selectors;

	const { getNewName } = helpers;

	const c = useStyles();

	const sections = getSectionsNamesAndTitles();
	const optionalSections = getOptionalQueueNamesAndTitles();
	const noOptionalSections = !optionalSections.length;

	const isOptionalSectionAddedAsFollowUp = (section) =>
		target.includes(section.name);

	const areAllOptionalSectionsAddedAsFollowUps = optionalSections.every(
		(section) => target.includes(section.name)
	);

	const isFollowUpInOptionalQueue = (sectionName) =>
		optionalSections.some((section) => section.name === sectionName);

	const isSectionNested = (sectionName) =>
		!isFollowUpInOptionalQueue(sectionName);

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

	// ------------------ Add-linked-section handler -------------------

	const [pickerOpen, setPickerOpen] = useState(false);

	// On right Button click, open picker or show error popup
	const handleAddLinkedSection = (e) => {
		if (noOptionalSections) showPopover(e, message_optionalQueueIsEmpty);
		else if (areAllOptionalSectionsAddedAsFollowUps)
			showPopover(e, message_allOptionalSectionsAdded);
		else if (!pickerOpen) setPickerOpen(true);
	};

	// On picker option selected, add section
	const addLinkedSection = (e) => {
		const sectionName = e.target.value;
		editAnswer(makeNestedTargetEvent("add", sectionName));
		setPickerOpen(false);
	};

	// ------------------------ Other handlers -------------------------

	// On left button click, add section
	const handleAddNestedSection = () => {
		const sectionName = getNewName();
		addSectionToSections({ sectionName });
		editAnswer(makeNestedTargetEvent("add", sectionName));
	};

	const handleDeleteAnswer = () => {
		const confirmed = window.confirm("Delete answer?");
		if (confirmed) deleteAnswer({ answerId });
	};

	const handleMoveAnswerUp = () => moveAnswer({ answerId, direction: "up" });

	const handleMoveAnswerDown = () =>
		moveAnswer({ answerId, direction: "down" });

	// ----------------- Drilled props modifications ------------------

	const modifiedOperations = {
		...operations,
		// Remove section refrence from "target" list
		// If section is nested, remove its data from "sections" store
		deleteSection: ({ sectionName }) => {
			editAnswer(makeNestedTargetEvent("delete", sectionName));
			if (isSectionNested(sectionName))
				deleteSectionFromSections({ sectionName });
		},
		moveSection: ({ sectionName, direction }) =>
			editAnswer(makeNestedTargetEvent("move", sectionName, direction)),
	};

	// ----------------------------- View ------------------------------

	// ------------- Viewer -------------

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

	// ------------- Config -------------

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
				{sections.map(({ name, title }) => (
					<MenuItem value={name} key={name} children={"After " + title} />
				))}
			</TextField>
		</>
	);

	// ------------- Fields -------------

	const pickerId = "followUpPicker";

	const fields = target.map((targetSection, i) => (
		<Section
			key={targetSection}
			sectionName={targetSection}
			sectionData={getSectionData(targetSection)}
			isFirst={i === 0}
			isLast={i === target.length - 1}
			headingPrefix={!isSectionNested(targetSection) ? "Ref" : null}
			operations={modifiedOperations}
			{...{ selectors, helpers }}
		/>
	));

	const fieldsFooter = (
		<>
			{
				// Follow-up link picker
				pickerOpen && (
					<div className={c.mBottom2}>
						<div className={c.form}>
							<Typography
								component="label"
								htmlFor={pickerId}
								children="Reference:"
							/>
							<TextField
								select
								fullWidth
								inputProps={{ id: pickerId }}
								onChange={addLinkedSection}
							>
								{optionalSections
									// Prevent linking the same section twice
									.filter(
										(section) => !isOptionalSectionAddedAsFollowUp(section)
									)
									.map(({ name, title }) => (
										<MenuItem value={name} key={name} children={title} />
									))}
							</TextField>
						</div>
					</div>
				)
			}
			<ButtonGroup fullWidth variant="outlined">
				<Tooltip title="Create a new section within the answer.">
					<Button
						children="New Nested Follow-up"
						onClick={handleAddNestedSection}
					/>
				</Tooltip>
				<Tooltip title="Choose an existing section from Optional Queue. If reached, it will get removed from Optional Queue.">
					<Button
						children="New Follow-up Reference"
						onClick={handleAddLinkedSection}
					/>
				</Tooltip>
			</ButtonGroup>
		</>
	);

	// -------------------------

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
			handleDelete={handleDeleteAnswer}
			handleMoveUp={handleMoveAnswerUp}
			handleMoveDown={handleMoveAnswerDown}
		/>
	);
};
