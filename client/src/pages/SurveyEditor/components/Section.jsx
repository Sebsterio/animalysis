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

	// --------------------------- Operations ----------------------------

	const curriedOperations = {
		...operations,
		updateQuestion: (data) => updateQuestion({ ...data, sectionName }),
		deleteQuestion: (data) => deleteQuestion({ ...data, sectionName }),
		moveQuestion: (data) => moveQuestion({ ...data, sectionName }),
		addAnswer: (data) => addAnswer({ ...data, sectionName }),
		deleteAnswer: (data) => deleteAnswer({ ...data, sectionName }),
		moveAnswer: (data) => moveAnswer({ ...data, sectionName }),
		updateAnswer: (data) => updateAnswer({ ...data, sectionName }),
	};

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
				{...{ questionProps, isFirst, isLast, selectors }}
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
