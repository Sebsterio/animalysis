import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		padding: theme.spacing(3),
	},
	surveyBtn: {
		margin: theme.spacing(1, 0),
	},
}));

export const Home = ({ history, surveyIsLoaded }) => {
	const clx = useStyles();

	const goToSurvey = () => history.push("/analysis");

	return (
		<Container maxWidth="xs" className={clx.container}>
			{surveyIsLoaded && (
				<Button
					variant="contained"
					className={clx.surveyBtn}
					onClick={goToSurvey}
					children="Continue Analysis"
				/>
			)}
		</Container>
	);
};
