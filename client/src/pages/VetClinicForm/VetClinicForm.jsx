import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Alert } from "@material-ui/lab";
import {
	Page,
	Nav,
	Form,
	isFormFilled,
	ConfirmDialog,
	Stack,
	LinkBlock,
} from "components";
import { Members } from "./components";
import { useValueWithTimeout } from "hooks";
import getFormFields from "./VetClinicForm-formData";

const useStyles = makeStyles((theme) => ({
	accordionDetails: {
		padding: theme.spacing(1, 2, 3),
		flexFlow: "column nowrap",
	},
	indent: { marginLeft: theme.spacing(1) },
}));

export const VetClinicForm = ({
	// router
	history,
	// store
	currentData,
	registered,
	updating,
	isMember,
	isAdmin,
	isOwner,
	isDemo,
	isSuperuser,
	isAllowedToDeleteMember,
	// dispatch
	update,
	create,
	deleteClinic,
	leaveClinic,
	// withError
	isError,
	emailError,
	errorMessage,
	clearError,
}) => {
	const c = useStyles();

	const { verified } = currentData;

	const [clinic, setClinic] = useState({ ...currentData });

	// Confirmation dialog
	const [dialogOpen, setDialogOpen] = useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	// Keep state updated with store
	useEffect(() => {
		setClinic({ ...currentData });
	}, [currentData]);

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

	const handleLeaveClinic = () => {
		const confirmed = window.confirm(
			"Are you sure you want to leave the organisation?"
		);
		if (!confirmed) return;
		leaveClinic();
		history.push("/");
	};

	const toggleVerified = () => update({ verified: !verified });

	const setEmailNotifications = (e) =>
		setClinic({ ...clinic, emailNotifications: e.target.checked });

	// ------------------------- Selectors ---------------------------

	const canSubmit = () =>
		isFormFilled(formFields, clinic) && (!registered || isAdmin) && !isDemo;

	// --------------------------- View ------------------------------

	const formFields = getFormFields({
		emailError: emailError ? errorMessage : false,
		disabled: (registered && !isAdmin) || isDemo,
		hasPhoto: !!clinic.logoUrl,
	});

	const defaultButtonText = registered ? "Update" : "Register";
	const dynamicButtonText = useValueWithTimeout({
		isOngoing: updating,
		valueDefault: defaultButtonText,
		valueOngoing: registered ? "Updating..." : "Registering...",
		valueDone: "Done!",
	});

	return (
		<>
			<Page
				header={
					<LinkBlock
						to="/clinic-search"
						text={registered ? "Search organisations" : "Join an organisation"}
					/>
				}
				main={
					<div>
						{/* Details */}
						<Accordion defaultExpanded={!registered}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h5">Details</Typography>
							</AccordionSummary>
							<AccordionDetails className={c.accordionDetails}>
								<Form state={clinic} setState={setClinic} fields={formFields} />
							</AccordionDetails>
						</Accordion>

						{/* Members */}
						<Accordion disabled={!registered || isDemo}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h5">Members</Typography>
							</AccordionSummary>
							<AccordionDetails className={c.accordionDetails}>
								<Members
									{...{
										clinic,
										setClinic,
										isOwner,
										isAdmin,
										isAllowedToDeleteMember,
									}}
								/>
							</AccordionDetails>
						</Accordion>

						{/* Manage */}
						<Accordion disabled={!registered || !isMember || isDemo}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h5">Manage</Typography>
							</AccordionSummary>
							<AccordionDetails className={c.accordionDetails}>
								<Stack>
									<Alert
										severity={verified ? "success" : "warning"}
										children={
											verified ? "Clinic Verified" : "Verification pending"
										}
									/>
									{isSuperuser && (
										<Button
											children={verified ? "SU Unverify" : "SU Verify"}
											onClick={toggleVerified}
											variant="contained"
											color={verified ? "secondary" : "primary"}
											fullWidth
										/>
									)}
									<FormControlLabel
										className={c.indent}
										label="Recieve reports by email"
										disabled={!isAdmin}
										control={
											<Checkbox
												checked={clinic.emailNotifications || false}
												onChange={setEmailNotifications}
											/>
										}
									/>
									<Button
										children="Leave Organisation"
										onClick={handleLeaveClinic}
										variant="outlined"
										fullWidth
									/>
									<Button
										children="Delete Organisation"
										onClick={openDialog}
										disabled={!isOwner}
										variant="outlined"
										color="secondary"
										fullWidth
									/>
								</Stack>
							</AccordionDetails>
						</Accordion>
					</div>
				}
				footer={
					<Nav
						textLeft="Cancel"
						onClickLeft={closeForm}
						textRight={isError ? defaultButtonText : dynamicButtonText}
						onClickRight={submitForm}
						disabledRight={!canSubmit()}
						noArrows
					/>
				}
			/>

			<ConfirmDialog
				title="Caution!"
				text="This will permanently delete your organization from the database. Do you want to proceed?"
				buttonColor={["primary", "secondary"]}
				isOpen={dialogOpen}
				close={closeDialog}
				confirm={handleConfirmDelete}
			/>
		</>
	);
};
