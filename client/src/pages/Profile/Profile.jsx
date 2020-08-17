import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Head, ReportsList, Footer } from "./components";
import { surveyData } from "redux/survey/survey-data";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	surveyBtn: {
		margin: theme.spacing(1, 0),
	},
}));

export const Profile = ({
	// router
	match,
	history,
	// store
	getPetByName,
	getReports,
}) => {
	const clx = useStyles();

	const { name } = match.params;
	const pet = getPetByName(name);
	if (!pet) return <Redirect to="/not-found" />;

	const petId = pet.id;
	const data = { ...surveyData(pet), petId };
	const reports = getReports(pet).reverse();

	return (
		<Container maxWidth="xs" className={clx.container}>
			<Head {...{ history, pet }} />
			<ReportsList {...{ history, reports }} />
			<Footer {...{ history, petId, data }} />
		</Container>
	);
};
