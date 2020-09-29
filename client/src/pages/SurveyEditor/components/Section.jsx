import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { Division, Question, ConditionInput } from "./index";

// ----------------------------------------------------------

export const Section = ({
	sectionName,
	sectionData: { title, condition = "", questions, hidden = false },
	isFirst,
	isLast,
	operations,
	selectors,
	headingPrefix,
}) => {
	const {
		modifySectionTitle,
		modifySectionCondition,
		modifySectionIsHidden,
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

	const handleSectionIsHiddenInput = (e) =>
		modifySectionIsHidden({ sectionName, value: e.target.checked });

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
	const isHiddenId = sectionName + "-isHidden";

	const form = (
		<>
			{/* title */}
			<Tooltip title="Displayed in survey header">
				<Typography component="label" htmlFor={titleId} children="Title" />
			</Tooltip>
			<TextField
				autoFocus
				fullWidth
				value={title}
				inputProps={{ id: titleId }}
				onChange={handleSectionTitleInput}
			/>

			{/* condition */}
			<Tooltip title="Run section only if the pet matches the condition">
				<Typography
					component="label"
					htmlFor={conditionId}
					children="Condition"
				/>
			</Tooltip>
			<ConditionInput
				value={condition}
				inputProps={{ id: conditionId }}
				onChange={handleSectionConditionInput}
			/>

			{/* hidden */}
			<Tooltip title="Don't run section unless it's referenced as a follow-up">
				<Typography component="label" htmlFor={isHiddenId} children="Hidden" />
			</Tooltip>
			<Switch
				checked={hidden}
				inputProps={{ id: isHiddenId }}
				onChange={handleSectionIsHiddenInput}
			/>
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
