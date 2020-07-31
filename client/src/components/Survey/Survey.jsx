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
		const firstSectionRoute = surveyData[0].route;
		return <Redirect to={`/survey/${firstSectionRoute}`} />;
	}

	if (sectionRoute === "review") return <Review surveyData={surveyData} />;

	const sectionData = surveyData.find(
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

	const goToNextQuestion = () => {
		// Check if there are more questions in current section
		const { questions } = sectionData;
		const thisQuestionIndex = questions.findIndex(
			(q) => q.route === questionRoute
		);
		if (thisQuestionIndex < questions.length - 1) {
			const nextQuestionRoute = questions[thisQuestionIndex + 1].route;
			return history.push(nextQuestionRoute);
		}

		// Check if there are more sections
		const sections = surveyData;
		const thisSectionIndex = sections.findIndex(
			(s) => s.route === sectionRoute
		);
		if (thisSectionIndex < sections.length - 1) {
			const nextSectionRoute = sections[thisSectionIndex + 1].route;
			return history.push(`/survey/${nextSectionRoute}`);
		}

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
