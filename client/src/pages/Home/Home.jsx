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

	const goToSurvey = () => history.push("/analysis");

	const startSurvey = (data) => {
		initSurvey(data);
		goToSurvey();
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
			{surveyIsLoaded && (
				<Button
					variant="contained"
					className={clx.surveyBtn}
					onClick={goToSurvey}
					children="Continue Analysis"
				/>
			)}
			<Button
				variant="contained"
				className={clx.surveyBtn}
				onClick={startRoutineCheck}
				children="Routine Health Check"
			/>
			<Button
				variant="contained"
				color="primary"
				className={clx.surveyBtn}
				onClick={startProblemReport}
				children="Report a Problem"
			/>
		</Container>
	);
};

export default Home;
