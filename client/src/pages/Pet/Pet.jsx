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
	getPetById,
	getReports,
	isVet,
}) => {
	const { name } = match.params; // should be name_or_id
	let pet = getPetByName(name);
	if (!pet) pet = getPetById(name);
	if (!pet) return <Redirect to="/not-found" />;

	const reports = getReports(pet);

	return (
		<Page
			header={<PetSnippet {...{ history, pet, isVet }} />}
			main={<ReportsList {...{ history, reports }} />}
			footer={<Footer {...{ history, pet, isVet }} />}
		/>
	);
};
