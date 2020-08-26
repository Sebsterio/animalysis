import React from "react";
import TextField from "@material-ui/core/TextField";
import { Division, Question } from "./index";
import { useStyles } from "../SurveyEditor-styles";

// ----------------------------------------------------------

export const Section = ({
	sectionName,
	sectionData: { title, questions },
	isFirst,
	isLast,
	operations,
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
	};

	// ---------------------------- Handlers -----------------------------

	const handleDelete = () => {
		const confirmed = window.confirm("Permanently delete the ENTIRE section?");
		if (confirmed) deleteSection(sectionName);
	};

	// ------------------------------ View -------------------------------

	const fields = questions.map((questionProps, i) => {
		const isFirst = i === 0;
		const isLast = i === questions.length - 1;
		return (
			<Question
				key={questionProps.id}
				{...{ questionProps, isFirst, isLast }}
				operations={curriedOperations}
			/>
		);
	});

	const form = (
		<TextField
			autoFocus
			fullWidth
			value={title}
			onChange={(e) => modifySectionTitle(sectionName, e.target.value)}
			className={c.heading}
		/>
	);

	return (
		<Division
			heading={title}
			headingVariant="h6"
			fields={fields}
			form={form}
			isFirst={isFirst}
			isLast={isLast}
			handleDelete={handleDelete}
			handleMoveUp={() => moveSection(sectionName, "up")}
			handleMoveDown={() => moveSection(sectionName, "down")}
			addButtonText="New Question"
			handleAddButtonClick={() => addQuestion(sectionName)}
		/>
	);
};
