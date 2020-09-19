import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Page, Stack, LinkBlock, Form } from "components";
import { formFields } from "./VetSurvey-formData";

export const VetSurvey = ({
	history,
	surveyIsLoaded,
	demoPet,
	startProblemReport,
	startRoutineCheck,
	addDemoPet,
	modifyPet,
	deletePet,
}) => {
	const [pet, setPet] = useState({});

	useEffect(() => {
		if (!demoPet) addDemoPet();
		else setPet({ ...demoPet });
	}, [demoPet, setPet, addDemoPet]);

	// -------------------------- Handlers --------------------------

	const updatePet = () => modifyPet({ id: pet.id, data: pet });

	const handleRoutineCheckClick = () => {
		updatePet();
		startRoutineCheck({ pet, history });
	};
	const handleProblemReportClick = () => {
		updatePet();
		startProblemReport({ pet, history });
	};

	const handleEndPreview = () => deletePet({ id: "demo-pet" });

	// -------------------------- View --------------------------

	if (surveyIsLoaded) return <Redirect to="/analysis" />;

	return (
		<Page
			header={
				<LinkBlock
					to="/survey/edit"
					text="End preview"
					clickHandler={handleEndPreview}
				/>
			}
			main={<Form state={pet} setState={setPet} fields={formFields} />}
			footer={
				<Stack dense>
					<Button
						children="Routine Health Check"
						onClick={handleRoutineCheckClick}
						variant="contained"
						fullWidth
					/>
					<Button
						children="Report a Problem"
						onClick={handleProblemReportClick}
						color="primary"
						variant="contained"
						fullWidth
					/>
				</Stack>
			}
		/>
	);
};
