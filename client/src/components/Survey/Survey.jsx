import React from "react";
import { Redirect } from "react-router-dom";

import { Question } from "./components";

import "./Survey.scss";

const Survey = ({
	// state
	surveyData,
	pageStack,
	// dispatch
	submitAnswer,
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

	const handleInput = (i) => {
		submitAnswer({ sectionRoute, questionRoute, answerIndex: i });

		// TODO: redirect to next question
	};

	// -------------------------- TEMPORARY --------------------------------

	const isAnswered = (q) => q.answers.some((a) => a.selected);

	const getAnswer = (q) => q.answers.findIndex((a) => a.selected);

	const answers = (
		<div className="answers">
			{surveyData.map((s) => (
				<div className="answers__section" key={s.route}>
					{s.questions.map((q) => (
						<div className="answers__question" key={q.route}>
							{isAnswered(q) && (
								<>
									{s.route}
									{q.route}
									{getAnswer(q)}
								</>
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);

	// --------------------------- Render ----------------------------------

	return (
		<div className="Survey">
			{answers}

			<h1>Survey Page</h1>

			<Question data={questionData} handleInput={handleInput} />

			{/* Buttons "back" and "next" (history) */}
		</div>
	);
};

export default Survey;
