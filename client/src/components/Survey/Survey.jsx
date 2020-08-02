import React, { useEffect } from "react";

import { Question } from "./components";
import { isQuestionAnswered } from "./Survey-utils";

import "./Survey.scss";

/*************************************************
 * Manages survey location, history, and landmarks
 * Submits Question answers
 *************************************************/

const Survey = ({
	// state
	section,
	question,
	locationHistory,
	lastLandmark,
	nextLocationInSequence,
	nextLocationInSequenceIsLandmarked,
	// dispatch
	submitAnswer,
	pushLocation,
	popLocation,
	pushLandmark,
	popLandmark,
	// router
	history,
}) => {
	// Remove obsolete landmark after going "back"
	useEffect(() => {
		if (nextLocationInSequenceIsLandmarked) popLandmark();
	});

	// ---------------------------- Aux ----------------------------------

	// Go to next question OR section OR the final page
	// Handle redirect to clarification section and return from it
	const goToNextLocation = (redirect) => {
		if (redirect) {
			pushLandmark(nextLocationInSequence);
			pushLocation({
				sequenceName: redirect,
				sectionIndex: 0,
				questionIndex: 0,
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
				<Question handleAnswer={handleAnswer} />
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
