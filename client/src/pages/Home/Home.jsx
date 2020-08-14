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

// TEMP
const pet = {
	name: "Benny",
	species: "canine",
};

const Home = ({ history, surveyIsLoaded, initSurvey }) => {
	const clx = useStyles();

	const data = surveyData(pet);

	const startSurvey = (data) => {
		if (!surveyIsLoaded) initSurvey(data);
		history.push("/analysis");
	};

	const startRoutineCheck = () =>
		startSurvey({
			...data,
			alert: 0,
		});

	// Add primer section to mainQueue and set alarm to green
	const startProblemReport = () => {
		const { primerSection, mainQueue } = data;
		startSurvey({
			...data,
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
