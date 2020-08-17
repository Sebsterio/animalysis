import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, TextField } from "@material-ui/core";
import { isEmpty } from "utils/object";

/*******************************************************
 * URL match:
 * /edit-profile/real-pet -- init form with pet data
 * /edit-profile/typo     -- redirect to /add-profile
 * /add-profile           -- init empty form
 ********************************************************/

export const AddOrEditProfile = ({ match, getPet }) => {
	const [pet, setPet] = useState({});

	console.log(pet == {});

	const { name } = match.params;
	const currentPet = name ? getPet(name) : null;
	if (name && !currentPet) return <Redirect to="/add-profile" />;
	if (currentPet && isEmpty(pet)) setPet({ ...currentPet });

	const handleChange = (e) =>
		setPet({ ...pet, [e.target.name]: e.target.value });

	return (
		<Container>
			<TextField
				label="Name"
				name={"name"}
				variant="outlined"
				value={pet.name || ""}
				onChange={handleChange}
			/>
		</Container>
	);
};
