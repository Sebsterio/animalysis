import React from "react";
import { Redirect } from "react-router-dom";

import { Question, Review } from "./components";
import {
	getNextRouteInGroup,
	getRouteIndex,
	isQuestionAnswered,
} from "./Survey-utils";

import "./Survey.scss";

const Survey = ({
	// state
	surveyData,
	returnStack,
	// dispatch
	submitAnswer,
	pushToStack,
	popFromStack,
	// router
	match,
	history,
}) => {
	const { section: sectionRoute, question: questionRoute } = match.params;
	const { main, optional } = surveyData;

	// -------------------------- Routing --------------------------------

	if (!sectionRoute) {
		const firstSectionRoute = main[0].route;
		return <Redirect to={`/new-report/${firstSectionRoute}`} />;
	}

	if (sectionRoute === "review") return <Review surveyData={surveyData} />;

	const sectionData = [...main, ...optional].find(
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

	// Get the route of next question
	// OR next section in main sequence
	// OR next section after completing a clarification section
	// OR final page
	const getNextRoute = () => {
		const { questions } = sectionData;
		const sections = surveyData.main;
		let nextRoute = getNextRouteInGroup(null, questions, questionRoute);
		if (!nextRoute) {
			if (!!returnStack.length) {
				nextRoute = returnStack[returnStack.length - 1];
				popFromStack();
			} else {
				nextRoute =
					getNextRouteInGroup("/new-report/", sections, sectionRoute) ||
					"/new-report/review";
			}
		}
		return nextRoute;
	};

	const goToRoute = (route) => history.push(route);

	const goToNextRoute = () => {
		goToRoute(getNextRoute());
	};

	// Submit answer if different that current
	// Handle redirect to clarification section
	// Show next question
	const handleAnswer = (i, selected, redirect) => {
		if (!selected)
			submitAnswer({ sectionRoute, questionRoute, answerIndex: i });
		if (redirect) {
			pushToStack(getNextRoute());
			goToRoute("/new-report/" + redirect);
		} else goToNextRoute();
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
			{/* Section info*/}
			<div className="Survey__section">Section: {sectionData.title}</div>

			{/* Question */}
			<div className="Survey__question">
				<Question
					data={questionData}
					index={questionIndex}
					numQuestions={numQuestions}
					handleAnswer={handleAnswer}
				/>
			</div>

			{/* Footer buttons */}
			<div className="Survey__footer">
				<button
					className="Survey__nav-link"
					onClick={handleGoBack}
					disabled={!history.length}
				>
					&#60; Back
				</button>

				<button
					className="Survey__nav-link"
					onClick={handleGoForward}
					disabled={!isQuestionAnswered(questionData)}
				>
					Next &#62;
				</button>
			</div>
		</div>
	);
};

export default Survey;
