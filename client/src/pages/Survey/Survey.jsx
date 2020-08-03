import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Section, Question, Nav } from "./components";
import { Container } from "@material-ui/core";

import { isQuestionAnswered } from "./Survey-utils";

/*************************************************
 * Manages survey location, history, and landmarks
 * Submits Question answers
 *************************************************/

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
}));

export const Survey = ({
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

	// --------------------------- View ----------------------------------

	return (
		<Container maxWidth="xs" className={useStyles().container}>
			<Section section={section} />

			<Question handleAnswer={handleAnswer} />

			<Nav
				questionIsNotAnswered={!isQuestionAnswered(question)}
				isFirstQuestion={locationHistory.length <= 1}
				handleGoBack={handleGoBack}
				handleGoForward={handleGoForward}
			/>
		</Container>
	);
};
