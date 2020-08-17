import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

export const useStyles = makeStyles((theme) => ({
	container: {
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
	handleGoBack,
	handleGoForward,
}) => {
	const { type } = currentQuestion;
	const nextButtonIsEnlarged = ["text", "select-multiple"].includes(type);
	const clx = useStyles({ nextButtonIsEnlarged });

	return (
		<div className={clx.container}>
			<Button
				children="Back"
				onClick={() => handleGoBack(history)}
				startIcon={<KeyboardArrowLeft />}
			/>

			<Button
				children="Next"
				onClick={() => handleGoForward(history)}
				disabled={!questionIsAnswered}
				endIcon={<KeyboardArrowRight />}
				className={clx.nextButton}
			/>
		</div>
	);
};
