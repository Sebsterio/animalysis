import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Section, Question, Nav } from "./components";
import { Container } from "@material-ui/core";

import { arrayify } from "utils/array";

/*************************************************
 * Redirects if survey data not loaded (URL accessed manually when no survey is active)
 * Handles submitting answers and survey traversal (back and next)
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
	surveyIsLoaded,
	questionIsAnswered,
	currentQuestion,
	currentAnswer,
	// dispatch
	submitAnswer,
	addAnswer,
	removeAnswer,
	goForward,
	goBack,
	// router
	history,
}) => {
	const clx = useStyles();

	if (!surveyIsLoaded) return <Redirect to="/" />;

	const { type } = currentQuestion;

	// -------------------------------- Aux --------------------------------

	const isAnswerSelected = (i) => arrayify(currentAnswer).some((a) => a === i);

	// ------------------------------ Handlers -----------------------------

	const handleAnswer = (i, followUp, alert) => {
		const selected = isAnswerSelected(i);
		const args = { answerIndex: i, followUp, alert };

		if (type === "select-one") {
			submitAnswer(args);
			goForward(history);
		} else if (type === "select-multiple") {
			if (!selected) addAnswer(args);
			else removeAnswer(args);
		}
	};

	const handleGoBack = () => goBack(history);

	const handleGoForward = () => {
		if (type === "select-one") {
			const { followUp, alert } = currentQuestion.answers[currentAnswer];
			submitAnswer({ answerIndex: currentAnswer, followUp, alert });
		}
		goForward(history);
	};

	// -------------------------------- View --------------------------------

	return (
		<Container maxWidth="xs" className={clx.container}>
			<Section />
			<Question
				question={currentQuestion}
				handleAnswer={handleAnswer}
				isAnswerSelected={isAnswerSelected}
			/>
			<Nav
				canGoForward={questionIsAnswered}
				goBack={handleGoBack}
				goForward={handleGoForward}
				nextButtonEnlarged={type === "select-multiple"}
			/>
		</Container>
	);
};
