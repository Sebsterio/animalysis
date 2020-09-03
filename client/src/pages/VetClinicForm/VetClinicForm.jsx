import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav, Form, isFormFilled, ConfirmDialog } from "components";
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
}) => {
	const c = useStyles();

	const [clinic, setClinic] = useState({ ...currentData });

	// Confirmation dialog
	const [dialogOpen, setDialogOpen] = useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	// ------------------------- Handlers ----------------------------

	const closeForm = () => history.push("/");

	const submitForm = () => (registered ? update(clinic) : create(clinic));

	const handleConfirmDelete = () => {
		deleteClinic();
		history.push("/");
	};

	// ------------------------- Selectors ---------------------------

	const canSubmit = () => isFormFilled(formFields, clinic);

	// --------------------------- View ------------------------------

	const formFields = getFormFields({
		emailError: emailError ? errorMessage : false,
		deleteClinic: openDialog, // -> handleConfirmDelete()
		registered,
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
			<Form state={clinic} setState={setClinic} fields={formFields} />

			<ConfirmDialog
				title="Caution!"
				text="This will permanently delete your organization from the database. Do you want to proceed?"
				buttonColor={["primary", "secondary"]}
				isOpen={dialogOpen}
				close={closeDialog}
				confirm={handleConfirmDelete}
			/>

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
