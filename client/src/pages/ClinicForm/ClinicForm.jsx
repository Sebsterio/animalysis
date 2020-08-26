import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav, Form, isFormFilled } from "components";

import { formFields } from "./ClinicForm-formData";

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

export const ClinicForm = ({
	// router
	history,
	currentClinic,
	updateClinic,
}) => {
	const c = useStyles();

	const [clinic, setClinic] = useState({ ...currentClinic });

	const closeForm = () => history.push("/");

	const submitForm = () => {
		updateClinic(clinic);
		closeForm();
	};

	const canSubmit = () => isFormFilled(formFields, clinic);

	return (
		<Container maxWidth="xs" className={c.page}>
			<Form state={clinic} setState={setClinic} fields={formFields} />
			<div className={c.footer}>
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight="Save"
					onClickRight={submitForm}
					disabledRight={!canSubmit()}
					noArrows
				/>
			</div>
		</Container>
	);
};
