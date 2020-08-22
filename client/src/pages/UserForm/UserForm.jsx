import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav } from "components/Nav";
import { Form, isFormFilled } from "components/Form";

import { formFields } from "./UserForm-formData";

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

export const UserForm = ({ history, currentUser, updateUser }) => {
	const clx = useStyles();

	const [user, setUser] = useState({ ...currentUser });

	const closeForm = () => history.push("/");

	const submitForm = () => {
		updateUser(user);
		closeForm();
	};

	const canSubmit = () => isFormFilled(formFields, user);

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Form state={user} setState={setUser} fields={formFields} />
			<div className={clx.footer}>
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
