import React, { useState } from "react";
import { Page, Nav, Form, isFormFilled, LinkBlock } from "components";
import { formFields } from "./ClinicForm-formData";

export const ClinicForm = ({ history, currentClinic, updateClinic }) => {
	const [clinic, setClinic] = useState({ ...currentClinic });

	const closeForm = () => history.push("/");

	const submitForm = () => {
		updateClinic(clinic);
		closeForm();
	};

	const canSubmit = () => isFormFilled(formFields, clinic);

	return (
		<Page
			header={<LinkBlock to="/clinic-search" text="Find a clinic" />}
			main={<Form state={clinic} setState={setClinic} fields={formFields} />}
			footer={
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight="Save"
					onClickRight={submitForm}
					disabledRight={!canSubmit()}
					noArrows
				/>
			}
		/>
	);
};
