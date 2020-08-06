import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { surveyData } from "redux/survey/survey-data";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		padding: theme.spacing(3),
	},
}));

const Home = ({ history, surveyIsLoaded, initSurvey }) => {
	const clx = useStyles();

	const startSurvey = () => {
		if (!surveyIsLoaded) initSurvey(surveyData);
		history.push("/new-report");
	};

	return (
		<Container maxWidth="xs" className={clx.container}>
			<Button variant="contained" onClick={startSurvey}>
				Report a Problem
			</Button>
		</Container>
	);
};

export default Home;
