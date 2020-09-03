import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Nav, Form, isFormFilled, ConfirmDialog } from "components";
import { Members } from "./components";
import { useValueWithTimeout } from "hooks";

import getFormFields from "./VetClinicForm-formData";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	footer: {
		marginTop: theme.spacing(4),
	},
	accordionDetails: {
		padding: theme.spacing(1, 2, 3),
		flexFlow: "column nowrap",
	},
}));

export const VetClinicForm = ({
	// router
	history,
	// store
	currentData,
	registered,
	updating,
	// dispatch
	update,
	create,
	deleteClinic,
	// withError
	isError,
	emailError,
	errorMessage,
	clearError,
}) => {
	const c = useStyles();

	const [clinic, setClinic] = useState({ ...currentData });

	// Confirmation dialog
	const [dialogOpen, setDialogOpen] = useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	// ------------------------- Handlers ----------------------------

	const closeForm = () => history.push("/");

	const submitForm = () => {
		clearError();
		registered ? update(clinic) : create(clinic);
	};

	const handleConfirmDelete = () => {
		deleteClinic();
		history.push("/");
	};

	// ------------------------- Selectors ---------------------------

	const canSubmit = () => isFormFilled(formFields, clinic);

	// --------------------------- View ------------------------------

	const formFields = getFormFields({
		emailError: emailError ? errorMessage : false,
	});

	const defaultButtonText = registered ? "Update" : "Register";
	const dynamicButtonText = useValueWithTimeout({
		isOngoing: updating,
		valueDefault: defaultButtonText,
		valueOngoing: registered ? "Updating..." : "Registering...",
		valueDone: "Done!",
	});

	return (
		<Container maxWidth="xs" className={c.page}>
			<div>
				{/* Contact */}
				<Accordion defaultExpanded={!registered}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant="h5">Contact</Typography>
					</AccordionSummary>
					<AccordionDetails className={c.accordionDetails}>
						<Form state={clinic} setState={setClinic} fields={formFields} />
					</AccordionDetails>
				</Accordion>

				{/* Members */}
				<Accordion disabled={!registered}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant="h5">Members</Typography>
					</AccordionSummary>
					<AccordionDetails className={c.accordionDetails}>
						<Members {...{ clinic, setClinic }} />
					</AccordionDetails>
				</Accordion>

				{/* Manage */}
				<Accordion disabled={!registered}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant="h5">Manage</Typography>
					</AccordionSummary>
					<AccordionDetails className={c.accordionDetails}>
						<Button
							children="Delete Organisation"
							onClick={openDialog}
							variant="outlined"
							color="secondary"
							fullWidth
						/>
					</AccordionDetails>
				</Accordion>

				<ConfirmDialog
					title="Caution!"
					text="This will permanently delete your organization from the database. Do you want to proceed?"
					buttonColor={["primary", "secondary"]}
					isOpen={dialogOpen}
					close={closeDialog}
					confirm={handleConfirmDelete}
				/>
			</div>

			<div className={c.footer}>
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight={isError ? defaultButtonText : dynamicButtonText}
					onClickRight={submitForm}
					disabledRight={!canSubmit()}
					noArrows
				/>
			</div>
		</Container>
	);
};
