import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Division, Question } from "./index";
import { useStyles } from "../SurveyEditor-styles";

// ----------------------------------------------------------

export const Section = ({
	sectionName,
	sectionData: { title, questions },
	isFirst,
	isLast,
	operations,
	selectors,
	helpers,
	headingPrefix,
}) => {
	const {
		modifySectionTitle,
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

	const c = useStyles();

	// ---------------------------- Handlers -----------------------------

	const handleSectionTitleInput = (e) =>
		modifySectionTitle({ sectionName, value: e.target.value });

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

	// Viewer

	const form = (
		<TextField
			autoFocus
			fullWidth
			value={title}
			onChange={handleSectionTitleInput}
			className={c.heading}
		/>
	);

	// Fields editor

	const fields = questions.map((questionProps, i) => (
		<Question
			key={questionProps.id}
			isFirst={i === 0}
			isLast={i === questions.length - 1}
			operations={modifiedOperations}
			{...{ questionProps, selectors, helpers }}
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
