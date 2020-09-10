import React from "react";
import { Redirect } from "react-router-dom";
import { Footer } from "./components";
import { Page, PetSnippet, ReportsList } from "components";

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

	const reports = getReports(pet);

	return (
		<Page
			header={<PetSnippet {...{ history, pet }} />}
			main={<ReportsList {...{ history, reports }} />}
			footer={<Footer {...{ history, pet }} />}
		/>
	);
};
