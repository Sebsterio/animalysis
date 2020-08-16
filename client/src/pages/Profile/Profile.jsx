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
	id: "123412341234",
	name: "Benny",
	species: "canine",
};

export const Profile = ({
	// router
	history,
	// store
	surveyIsLoaded,
	isPetIdActive,
	// dispatch
	startRoutineCheck,
	startProblemReport,
}) => {
	const clx = useStyles();

	const data = { ...surveyData(pet), petId: pet.id };

	return (
		<Container maxWidth="xs" className={clx.container}>
			<Button
				variant="contained"
				className={clx.surveyBtn}
				onClick={() => startRoutineCheck(data)}
				children="Routine Health Check"
			/>
			<Button
				variant="contained"
				color="primary"
				className={clx.surveyBtn}
				onClick={() => startProblemReport(data)}
				children="Report a Problem"
			/>
		</Container>
	);
};
