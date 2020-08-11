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
	// dispatch
	goBack,
	handleGoForward,
}) => {
	const { type } = currentQuestion;
	const nextButtonIsEnlarged = type === "select-multiple";
	const clx = useStyles({ nextButtonIsEnlarged });

	return (
		<Container className={clx.container}>
			<Button
				children="Back"
				onClick={() => goBack(history)}
				startIcon={<KeyboardArrowLeft />}
			/>

			<Button
				children="Next"
				onClick={() => handleGoForward(history)}
				disabled={!questionIsAnswered}
				endIcon={<KeyboardArrowRight />}
				className={clx.nextButton}
			/>
		</Container>
	);
};
