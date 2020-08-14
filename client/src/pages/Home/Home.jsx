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
	surveyBtn: {
		margin: theme.spacing(1, 0),
	},
}));

const Home = ({ history, surveyIsLoaded, initSurvey }) => {
	const clx = useStyles();

	const startSurvey = (data) => {
		if (!surveyIsLoaded) initSurvey(data);
		history.push("/analysis");
	};

	const startRoutineCheck = () =>
		startSurvey({
			...surveyData,
			alert: 0,
		});

	// Add primer section to mainQueue and set alarm to green
	const startProblemReport = () => {
		const { primerSection, mainQueue } = surveyData;
		startSurvey({
			...surveyData,
			alert: 1,
			mainQueue: [primerSection, ...mainQueue],
		});
	};

	return (
		<Container maxWidth="xs" className={clx.container}>
			<Button
				variant="contained"
				className={clx.surveyBtn}
				onClick={startRoutineCheck}
			>
				Routine Health Check
			</Button>
			<Button
				variant="contained"
				color="primary"
				className={clx.surveyBtn}
				onClick={startProblemReport}
			>
				Report a Problem
			</Button>
		</Container>
	);
};

export default Home;
