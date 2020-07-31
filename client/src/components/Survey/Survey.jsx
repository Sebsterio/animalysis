import React from "react";
import { Redirect } from "react-router-dom";

import { Question, Review } from "./components";
import { getNextRoute } from "./Survey-utils";

import "./Survey.scss";

const Survey = ({
	// state
	surveyData,
	pageStack,
	// dispatch
	submitAnswer,
	// router
	match,
	history,
}) => {
	const { section: sectionRoute, question: questionRoute } = match.params;

	// -------------------------- Routing --------------------------------

	if (!sectionRoute) {
		const firstSectionRoute = surveyData.main[0].route;
		return <Redirect to={`/survey/${firstSectionRoute}`} />;
	}

	if (sectionRoute === "review") return <Review surveyData={surveyData} />;

	const sectionData = surveyData.main.find(
		(section) => section.route === sectionRoute
	);

	if (!questionRoute) {
		const firstQuestionRoute = sectionData.questions[0].route;
		return <Redirect to={`/survey/${sectionRoute}/${firstQuestionRoute}`} />;
	}

	const questionData = sectionData.questions.find(
		(question) => question.route === questionRoute
	);

	// -------------------------- Handlers ---------------------------------

	// Go to next question OR section OR the review page
	const goToNextRoute = () => {
		const { questions } = sectionData;
		const sections = surveyData.main;
		let nextRoute =
			getNextRoute(null, questions, questionRoute) ||
			getNextRoute("/survey/", sections, sectionRoute) ||
			"/survey/review";
		history.push(nextRoute);
	};

	const handleInput = (i) => {
		submitAnswer({ sectionRoute, questionRoute, answerIndex: i });
		goToNextRoute();
	};

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
