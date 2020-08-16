import React from "react";
import { Redirect } from "react-router-dom";
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
const pets = [
	{
		id: "123412341234",
		name: "Benny",
		species: "canine",
	},
];
const getPetByName = (name) =>
	pets.find((pet) => pet.name.toLowerCase() === name.toLowerCase());

export const Profile = ({
	// router
	match,
	history,
	// store
	isPetIdActive,
	// dispatch
	startRoutineCheck,
	startProblemReport,
}) => {
	const clx = useStyles();

	const { name } = match.params;
	const pet = getPetByName(name);
	if (!pet) return <Redirect to="/not-found" />;

	const petId = pet.id;
	const data = { ...surveyData(pet), petId };

	return (
		<Container maxWidth="xs" className={clx.container}>
			{isPetIdActive(petId) && (
				<Button
					variant="contained"
					color="primary"
					className={clx.surveyBtn}
					onClick={() => history.push("/analysis")}
					children="Continue Analysis"
				/>
			)}
			<Button
				variant="contained"
				className={clx.surveyBtn}
				onClick={() => startProblemReport(data)}
				children="Report a Problem"
			/>
			<Button
				variant="contained"
				className={clx.surveyBtn}
				onClick={() => startRoutineCheck(data)}
				children="Routine Health Check"
			/>
			<Button
				variant="outlined"
				className={clx.surveyBtn}
				onClick={() => history.push("/")}
				children="Back"
			/>
		</Container>
	);
};
