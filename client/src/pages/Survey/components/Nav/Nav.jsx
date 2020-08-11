import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

export const useStyles = makeStyles((theme) => ({
	container: {
		padding: 0,
		width: "100%",
		display: "flex",
		flexFlow: "row nowrap",
		justifyContent: "space-between",
	},
	nextButton: {
		// TEMPORARY FIX
		transform: (props) =>
			props.nextButtonIsEnlarged ? "scale(2)" : "scale(1)",
	},
}));

export const Nav = ({
	// parent
	history,
	// state
	currentQuestion,
	questionIsAnswered,
	currentAnswer,
	// dispatch
	goBack,
	goForward,
	addFollowUp,
	removeFollowUps,
}) => {
	const { type } = currentQuestion;

	// -------------------------- Handlers ----------------------------

	// Go to previous location in survey
	// Remove all followUp locations added by current question
	const handleGoBack = () => {
		removeFollowUps({ answerIndex: null });
		goBack(history);
	};

	// Go to next location in survey
	// Re-add followUp locations resulting from previously selected answer
	const handleGoForward = () => {
		if (type === "select-one") {
			const { followUp, alert } = currentAnswer;
			if (followUp) addFollowUp({ followUp });
			if (alert) console.log(alert); // TEMP <<<<
		}
		goForward(history);
	};

	// ---------------------------- View ------------------------------

	const nextButtonIsEnlarged = type === "select-multiple";

	const clx = useStyles({ nextButtonIsEnlarged });

	return (
		<Container className={clx.container}>
			<Button
				children="Back"
				onClick={handleGoBack}
				startIcon={<KeyboardArrowLeft />}
			/>

			<Button
				children="Next"
				onClick={handleGoForward}
				disabled={!questionIsAnswered}
				endIcon={<KeyboardArrowRight />}
				className={clx.nextButton}
			/>
		</Container>
	);
};
