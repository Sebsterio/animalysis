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
		updateQuestion: (id, data) => updateQuestion(sectionName, id, data),
		deleteQuestion: (questionId) => deleteQuestion(sectionName, questionId),
		moveQuestion: (questionId, direction) =>
			moveQuestion(sectionName, questionId, direction),
		addAnswer: (questionId) => addAnswer(sectionName, questionId),
		deleteAnswer: (questionId, id) => deleteAnswer(sectionName, questionId, id),
		moveAnswer: (qId, aId, dir) => moveAnswer(sectionName, qId, aId, dir),
		updateAnswer: (qId, aId, val) => updateAnswer(sectionName, qId, aId, val),
	};

	// ---------------------------- Handlers -----------------------------

	const handleDelete = () => {
		const confirmed = window.confirm("Permanently delete the ENTIRE section?");
		if (confirmed) deleteSection(sectionName);
	};

	// ------------------------------ View -------------------------------

	const form = (
		<TextField
			autoFocus
			fullWidth
			value={title}
			onChange={(e) => modifySectionTitle(sectionName, e.target.value)}
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
			onClick={() => addQuestion(sectionName)}
		/>
	);

	return (
		<Division
			heading={title}
			headingVariant="h6"
			fields={fields}
			fieldsFooter={fieldsFooter}
			form={form}
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDelete}
			handleMoveUp={() => moveSection(sectionName, "up")}
			handleMoveDown={() => moveSection(sectionName, "down")}
		/>
	);
};
