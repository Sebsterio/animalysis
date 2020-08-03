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
}));

export const Nav = ({
	questionIsNotAnswered,
	isFirstQuestion,
	handleGoBack,
	handleGoForward,
}) => {
	return (
		<Container className={useStyles().container}>
			<Button
				children="Back"
				onClick={handleGoBack}
				disabled={isFirstQuestion}
				startIcon={<KeyboardArrowLeft />}
			/>

			<Button
				children="Next"
				onClick={handleGoForward}
				disabled={questionIsNotAnswered}
				endIcon={<KeyboardArrowRight />}
			/>
		</Container>
	);
};
