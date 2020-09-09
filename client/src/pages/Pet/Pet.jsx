import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { ReportsList, Footer } from "./components";
import { Page, PetSnippet } from "components";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	surveyBtn: {
		margin: theme.spacing(1, 0),
	},
}));

export const Pet = ({
	// router
	match,
	history,
	// store
	getPetByName,
	getReports,
}) => {
	const c = useStyles();

	const { name } = match.params;
	const pet = getPetByName(name);
	if (!pet) return <Redirect to="/not-found" />;
	const { id, syncing, synced } = pet;

	const reports = getReports(pet).reverse();

	const fallbackMsg = syncing ? "Syncing" : undefined;

	return (
		<Page
			header={<PetSnippet {...{ history, pet }} />}
			main={<ReportsList {...{ history, reports, fallbackMsg }} />}
			footer={<Footer {...{ history, pet }} />}
		/>
	);
};
