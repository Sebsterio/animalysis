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

	const startSurvey = ({ alert }) => {
		if (!surveyIsLoaded) initSurvey({ surveyData, alert });
		history.push("/new-report");
	};

	const startRoutineCheck = () => startSurvey({ alert: 0 });

	const startProblemReport = () => startSurvey({ alert: 1 });

	return (
		<Container maxWidth="xs" className={clx.container}>
			<Button variant="contained" onClick={startRoutineCheck}>
				Routine Health Check
			</Button>
			<Button variant="contained" onClick={startProblemReport}>
				Report a Problem
			</Button>
		</Container>
	);
};

export default Home;
