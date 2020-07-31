import React from "react";
import { Redirect } from "react-router-dom";

import { Question } from "./components";

const Survey = ({
	// state
	surveyData,
	pageStack,
	// router
	match,
}) => {
	const { section: sectionRoute, question: questionRoute } = match.params;

	// --------------- Correct the path if incomplete ---------------------

	if (!sectionRoute) {
		const firstSectionRoute = surveyData[0].route;
		return <Redirect to={`survey/${firstSectionRoute}`} />;
	}

	const sectionData = surveyData.find(
		(section) => section.route === sectionRoute
	);

	if (!questionRoute) {
		const firstQuestionRoute = sectionData.questions[0].route;
		return <Redirect to={`${sectionRoute}/${firstQuestionRoute}`} />;
	}

	const questionData = sectionData.questions.find(
		(question) => question.route === questionRoute
	);

	// -------------------------- Handlers ---------------------------------

	const handleInput = () => {};

	// --------------------------- Render ----------------------------------

	return (
		<div className="Survey">
			<h1>Survey Page</h1>

			<Question data={questionData} handleInput={handleInput} />

			{/* Buttons "back" and "next" (history) */}
		</div>
	);
};

export default Survey;
