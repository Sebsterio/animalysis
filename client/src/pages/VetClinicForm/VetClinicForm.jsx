import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav, Form, isFormFilled } from "components";
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
	// withError
	isError,
	emailError,
	errorMessage,
}) => {
	const c = useStyles();

	const [clinic, setClinic] = useState({ ...currentData });

	const formFields = getFormFields({
		emailError: emailError ? errorMessage : false,
	});

	const canSubmit = isFormFilled(formFields, clinic);

	// ------------------------- Handlers ----------------------------

	const closeForm = () => history.push("/");

	const submitForm = () => (registered ? update(clinic) : create(clinic));

	// --------------------------- View ------------------------------

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
			<div className={c.footer}>
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight={isError ? defaultButtonText : dynamicButtonText}
					onClickRight={submitForm}
					disabledRight={!canSubmit}
					noArrows
				/>
			</div>
		</Container>
	);
};
