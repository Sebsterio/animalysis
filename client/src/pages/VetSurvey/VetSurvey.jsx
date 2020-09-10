import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { LinkBlock, Form } from "components";
import { formFields } from "./VetSurvey-formData";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(0.3, 0),
	},
}));

export const VetSurvey = ({
	history,
	surveyIsLoaded,
	demoPet,
	startProblemReport,
	startRoutineCheck,
	addDemoPet,
	modifyPet,
}) => {
	const c = useStyles();

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

	// -------------------------- View --------------------------

	if (surveyIsLoaded) return <Redirect to="/analysis" />;

	return (
		<Container maxWidth="xs" className={c.container}>
			<LinkBlock to="/survey/edit" text="End preview" />
			<div>
				<Form state={pet} setState={setPet} fields={formFields} />
			</div>
			<div>
				<Button
					children="Routine Health Check"
					onClick={handleRoutineCheckClick}
					className={c.button}
					variant="contained"
					fullWidth
				/>
				<Button
					fullWidth
					children="Report a Problem"
					onClick={handleProblemReportClick}
					color="primary"
					className={c.button}
					variant="contained"
				/>
			</div>
		</Container>
	);
};
