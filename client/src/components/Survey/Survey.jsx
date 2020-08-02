import React, { useEffect } from "react";

import { Question } from "./components";
import { isQuestionAnswered } from "./Survey-utils";
import { shallowCompare } from "utils/object";

import "./Survey.scss";

const Survey = ({
	// state
	sequence,
	section,
	question,
	locationHistory,
	lastLandmark,
	nextLocationInSequence,
	// dispatch
	submitAnswer,
	pushLocation,
	popLocation,
	pushLandmark,
	popLandmark,
	// router
	history,
}) => {
	// Handle obsolete landmarks after going "back"
	useEffect(() => {
		const nextLoc = nextLocationInSequence;
		if (!nextLoc || !lastLandmark) return;
		const nextLocationIsLandmarked = shallowCompare(nextLoc, lastLandmark);
		if (nextLocationIsLandmarked) popLandmark();
	});

	// ---------------------------- Aux ----------------------------------

	// Go to next question OR section OR the final page
	// Handle redirect to clarification section and return from it
	const goToNextLocation = (redirect) => {
		if (redirect) {
			pushLandmark(nextLocationInSequence);
			pushLocation({
				sequence: redirect,
				section: 0,
				question: 0,
			});
		} else if (nextLocationInSequence) pushLocation(nextLocationInSequence);
		else if (lastLandmark) {
			pushLocation(lastLandmark);
			popLandmark();
		} else history.push("/new-report/review");
	};

	// -------------------------- Handlers ---------------------------------

	// Submit answer if different that current
	// Show next question
	const handleAnswer = (i, selected, redirect) => {
		if (!selected) submitAnswer(i);
		goToNextLocation(redirect);
	};

	// Trace back location history
	const handleGoBack = () => {
		popLocation();
		// Obsolete landmarks removed in useEffect
	};

	// Go to next question following redirects
	const handleGoForward = () => {
		const redirect = question.answers.find((a) => a.selected).redirect;
		goToNextLocation(redirect);
	};

	// --------------------------- Render ----------------------------------

	return (
		<div className="Survey">
			{/* Section info*/}
			<div className="Survey__section">Section: {section.title}</div>

			{/* Question */}
			<div className="Survey__question">
				<Question
					data={question}
					// index={questionIndex + 1}
					// numQuestions={lastQuestionIndex + 1}
					handleAnswer={handleAnswer}
				/>
			</div>

			{/* Footer buttons */}
			<div className="Survey__footer">
				<button
					className="Survey__nav-link"
					onClick={handleGoBack}
					disabled={locationHistory.length <= 1}
				>
					&#60; Back
				</button>

				<button
					className="Survey__nav-link"
					onClick={handleGoForward}
					disabled={!isQuestionAnswered(question)}
				>
					Next &#62;
				</button>
			</div>
		</div>
	);
};

export default Survey;
