import React from "react";
import { Redirect } from "react-router-dom";

import { Question, Review } from "./components";
import { getNextRoute, getRouteIndex } from "./Survey-utils";

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
		return <Redirect to={`/new-report/${firstSectionRoute}`} />;
	}

	if (sectionRoute === "review") return <Review surveyData={surveyData} />;

	const sectionData = surveyData.main.find(
		(section) => section.route === sectionRoute
	);

	if (!questionRoute) {
		const firstQuestionRoute = sectionData.questions[0].route;
		return (
			<Redirect to={`/new-report/${sectionRoute}/${firstQuestionRoute}`} />
		);
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
			getNextRoute("/new-report/", sections, sectionRoute) ||
			"/new-report/review";
		history.push(nextRoute);
	};

	const handleAnswer = (i) => {
		submitAnswer({ sectionRoute, questionRoute, answerIndex: i });
		goToNextRoute();
	};

	// TEMP. TODO: traverse surveyData instead of history
	const handleGoBack = () => history.goBack();
	const handleGoForward = () => history.goForward();

	// --------------------------- Render ----------------------------------

	const { questions } = sectionData;
	const questionIndex = getRouteIndex(questions, questionRoute) + 1;
	const numQuestions = questions.length;

	return (
		<div className="Survey">
			<div className="Survey__section">{sectionData.title}</div>

			<div className="Survey__question">
				<Question
					data={questionData}
					index={questionIndex}
					numQuestions={numQuestions}
					handleAnswer={handleAnswer}
				/>
			</div>

			<div className="Survey__footer">
				<button className="Survey__nav-link" onClick={handleGoBack}>
					&#60; Back
				</button>
				<button className="Survey__nav-link" onClick={handleGoForward}>
					Next &#62;
				</button>
			</div>
		</div>
	);
};

export default Survey;
