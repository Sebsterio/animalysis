import React from "react";
import { Redirect } from "react-router-dom";
import { ReportsList, Footer } from "./components";
import { Page, PetSnippet } from "components";

export const Pet = ({
	// router
	match,
	history,
	// store
	getPetByName,
	getReports,
}) => {
	const { name } = match.params;
	const pet = getPetByName(name);
	if (!pet) return <Redirect to="/not-found" />;

	const reports = getReports(pet).reverse();

	console.log({ reports, reversed: reports.reverse() });

	return (
		<Page
			header={<PetSnippet {...{ history, pet }} />}
			main={<ReportsList {...{ history, reports }} />}
			footer={<Footer {...{ history, pet }} />}
		/>
	);
};
