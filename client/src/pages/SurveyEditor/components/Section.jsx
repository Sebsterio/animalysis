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

	const handleTitleInput = (e) =>
		modifySectionTitle({ sectionName, value: e.target.value });

	const handleDelete = () => {
		const confirmed = window.confirm("Permanently delete the ENTIRE section?");
		if (confirmed) deleteSection({ sectionName });
	};

	const handleAdd = () => addQuestion({ sectionName });

	const handleMoveUp = () => moveSection({ sectionName, direction: "up" });

	const handleMoveDown = () => moveSection({ sectionName, direction: "down" });

	// ----------------- Drilled props modifications ------------------

	const curriedOperations = {
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

	const form = (
		<TextField
			autoFocus
			fullWidth
			value={title}
			onChange={handleTitleInput}
			className={c.heading}
		/>
	);

	const fields = questions.map((questionProps, i) => {
		const isFirst = i === 0;
		const isLast = i === questions.length - 1;
		return (
			<Question
				key={questionProps.id}
				{...{ questionProps, isFirst, isLast, selectors, helpers }}
				operations={curriedOperations}
			/>
		);
	});

	const fieldsFooter = (
		<Button
			fullWidth
			variant="outlined"
			children="New Question"
			onClick={handleAdd}
		/>
	);

	return (
		<Division
			heading={title}
			headingVariant="h6"
			headingPrefix={headingPrefix}
			form={form}
			fields={fields}
			fieldsFooter={fieldsFooter}
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDelete}
			handleMoveUp={handleMoveUp}
			handleMoveDown={handleMoveDown}
		/>
	);
};
