import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Division, Question } from "./index";

// ----------------------------------------------------------

export const Section = ({
	sectionName,
	sectionData: { title, condition = "", questions },
	isFirst,
	isLast,
	operations,
	selectors,
	headingPrefix,
}) => {
	const {
		modifySectionTitle,
		modifySectionCondition,
		deleteSection,
		moveSection,
		addQuestion,
		updateQuestion,
		deleteQuestion,
		moveQuestion,
		addAnswer,
		deleteAnswer,
		moveAnswer,
		updateAnswer,
	} = operations;

	// ---------------------------- Handlers -----------------------------

	const handleSectionTitleInput = (e) =>
		modifySectionTitle({ sectionName, value: e.target.value });

	const handleSectionConditionInput = (e) =>
		modifySectionCondition({ sectionName, value: e.target.value });

	const handleDeleteSection = () => {
		const confirmed = window.confirm("Permanently delete the ENTIRE section?");
		if (confirmed) deleteSection({ sectionName });
	};

	const handleAddQuestion = () => addQuestion({ sectionName });

	const handleMoveSectionUp = () =>
		moveSection({ sectionName, direction: "up" });

	const handleMoveSectionDown = () =>
		moveSection({ sectionName, direction: "down" });

	// ----------------- Drilled props modifications ------------------

	const modifiedOperations = {
		...operations,
		updateQuestion: (data) => updateQuestion({ sectionName, ...data }),
		deleteQuestion: (data) => deleteQuestion({ sectionName, ...data }),
		moveQuestion: (data) => moveQuestion({ sectionName, ...data }),
		addAnswer: (data) => addAnswer({ sectionName, ...data }),
		deleteAnswer: (data) => deleteAnswer({ sectionName, ...data }),
		moveAnswer: (data) => moveAnswer({ sectionName, ...data }),
		updateAnswer: (data) => updateAnswer({ sectionName, ...data }),
	};

	// ------------------------------ View -------------------------------

	// Config editor

	const titleId = sectionName + "-title";
	const conditionId = sectionName + "-condition";

	const form = (
		<>
			{/* Title */}
			<Typography component="label" htmlFor={titleId} children="Title" />
			<TextField
				autoFocus
				fullWidth
				value={title}
				inputProps={{ id: titleId }}
				onChange={handleSectionTitleInput}
			/>

			{/* Condition */}
			<Typography
				component="label"
				htmlFor={conditionId}
				children="Condition"
			/>
			<TextField
				select
				fullWidth
				value={condition}
				inputProps={{ id: conditionId }}
				onChange={handleSectionConditionInput}
			>
				<MenuItem value="species:canine">Dog</MenuItem>
				<MenuItem value="species:feline">Cat</MenuItem>
				<MenuItem value="sex:male">Male (any)</MenuItem>
				<MenuItem value="sex:male entire">Male entire</MenuItem>
				<MenuItem value="sex:male neutered">Male neutered</MenuItem>
				<MenuItem value="sex:female">Female (any)</MenuItem>
				<MenuItem value="sex:female entire">Female entire</MenuItem>
				<MenuItem value="sex:female neutered">Female neutered</MenuItem>
				<MenuItem value="sex:entire">(any) entire)</MenuItem>
				<MenuItem value="sex:neutered">(any) neutered</MenuItem>
			</TextField>
		</>
	);

	// Fields editor

	const fields = questions.map((questionProps, i) => (
		<Question
			key={questionProps.id}
			isFirst={i === 0}
			isLast={i === questions.length - 1}
			operations={modifiedOperations}
			{...{ questionProps, selectors }}
		/>
	));

	const fieldsFooter = (
		<Button
			fullWidth
			variant="outlined"
			children="New Question"
			onClick={handleAddQuestion}
		/>
	);

	// ---------

	return (
		<Division
			backgroundColor="rgba(0,0,0,0.02)"
			heading={title}
			headingVariant="h6"
			headingPrefix={headingPrefix}
			form={form}
			formType="grid"
			fields={fields}
			fieldsFooter={fieldsFooter}
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDeleteSection}
			handleMoveUp={handleMoveSectionUp}
			handleMoveDown={handleMoveSectionDown}
		/>
	);
};
