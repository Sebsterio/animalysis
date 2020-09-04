import React, { useState } from "react";
import { Page, Nav, Form, isFormFilled, LinkBlock } from "components";
import { ClinicDetails } from "./components";
import { formFields } from "./ClinicForm-formData";

export const ClinicForm = ({
	history,
	currentClinic,
	clinicRegistered,
	updateClinic,
	leaveClinic,
}) => {
	const [clinic, setClinic] = useState({ ...currentClinic });

	const closeForm = () => history.push("/");

	const submitForm = () => {
		updateClinic(clinic);
		closeForm();
	};

	const canSubmit = () => isFormFilled(formFields, clinic);

	return (
		<Page
			header={
				<LinkBlock
					to="/clinic-search"
					text={clinicRegistered ? "Change clinic" : "Find a clinic"}
				/>
			}
			main={
				clinicRegistered ? (
					<ClinicDetails {...currentClinic} />
				) : (
					<>
						<Form state={clinic} setState={setClinic} fields={formFields} />
					</>
				)
			}
			footer={
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight={clinicRegistered ? "Edit" : "Save"}
					onClickRight={clinicRegistered ? leaveClinic : submitForm}
					disabledRight={clinicRegistered ? false : !canSubmit()}
					noArrows
				/>
			}
		/>
	);
};
