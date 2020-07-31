import React from "react";
import { Redirect } from "react-router-dom";

import { Question, Review } from "./components";

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

	const getNextRoute = (group, route) => {
		const thisIndex = group.findIndex((el) => el.route === route);
		if (thisIndex < group.length - 1) return group[thisIndex + 1].route;
	};

	const goToNextQuestion = () => {
		// Go to next question in section if it exists
		const { questions } = sectionData;
		let nextRoute = getNextRoute(questions, questionRoute);
		if (nextRoute) return history.push(nextRoute);

		// Go to next section if it exists
		nextRoute = getNextRoute(surveyData.main, sectionRoute);
		if (nextRoute) return history.push(`/survey/${nextRoute}`);

		// Go to review page
		return history.push("/survey/review");
	};

	const handleInput = (i) => {
		submitAnswer({ sectionRoute, questionRoute, answerIndex: i });
		goToNextQuestion();
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
