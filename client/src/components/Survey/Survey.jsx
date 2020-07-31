import React from "react";
import { Redirect } from "react-router-dom";

const Survey = ({
	// state
	surveyData,
	pageStack,
	// router
	history,
	match,
}) => {
	const { set, question } = match.params;

	if (!set) {
		const firstQuestionRoute = surveyData[0].route;
		return <Redirect to={`survey/${firstQuestionRoute}`} />;
	}

	return (
		<div className="Survey">
			<h1>Survey Page</h1>

			{/* Buttons "back" and "next" (history) */}
		</div>
	);
};

export default Survey;
