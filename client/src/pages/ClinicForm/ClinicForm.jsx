import React, { useState } from "react";
import { Page, Nav, Form, isFormFilled, LinkBlock } from "components";
import { ClinicDetails } from "./components";
import { formFields } from "./ClinicForm-formData";

export const ClinicForm = ({
	history,
	currentClinic,
	clinicRegistered,
	updateClinicInfo,
	leaveClinic,
}) => {
	const [clinic, setClinic] = useState({ ...currentClinic });

	const closeForm = () => history.push("/");

	const submitForm = () => {
		updateClinicInfo(clinic);
		closeForm();
	};

	const customizeClinic = () => {
		leaveClinic();
		updateClinicInfo(clinic);
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
					<Form state={clinic} setState={setClinic} fields={formFields} />
				)
			}
			footer={
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight={clinicRegistered ? "Customize" : "Save"}
					onClickRight={clinicRegistered ? customizeClinic : submitForm}
					disabledRight={clinicRegistered ? false : !canSubmit()}
					noArrows
				/>
			}
		/>
	);
};
