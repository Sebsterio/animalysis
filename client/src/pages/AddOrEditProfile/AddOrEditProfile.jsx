import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Form } from "components/Form";
import { isEmpty } from "utils/object";

/*******************************************************
 * URL match:
 * /edit-profile/real-pet -- init form with pet data
 * /edit-profile/typo     -- redirect to /add-profile
 * /add-profile           -- init empty form
 ********************************************************/

export const AddOrEditProfile = ({ match, getPet }) => {
	const [pet, setPet] = useState({});

	const { name } = match.params;
	const currentPet = name ? getPet(name) : null;
	if (name && !currentPet) return <Redirect to="/add-profile" />;
	if (currentPet && isEmpty(pet)) setPet({ ...currentPet });

	const handleChange = (e) =>
		setPet({ ...pet, [e.target.name]: e.target.value });

	return (
		<Container>
			<Form
				state={pet}
				handleChange={handleChange}
				fields={[
					{
						type: "text",
						name: "name",
						label: "Name",
					},
				]}
			/>
		</Container>
	);
};
