import React, { useState } from "react";
import { Page, Nav, Form, isFormFilled } from "components";
import { formFields } from "./ProfileForm-formData";

export const ProfileForm = ({ history, currentProfile, isDemo, update }) => {
	const [profile, setProfile] = useState({ ...currentProfile });

	const closeForm = () => history.push("/");

	const submitForm = () => {
		update(profile);
		closeForm();
	};

	const canSubmit = () => isFormFilled(formFields, profile) && !isDemo;

	return (
		<Page
			main={<Form state={profile} setState={setProfile} fields={formFields} />}
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
