import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
}));

export const AddOrEditProfile = ({ match, getPet }) => {
	const [pet, setPet] = useState({});
	const clx = useStyles();

	const { name } = match.params;
	const currentPet = name ? getPet(name) : null;
	if (name && !currentPet) return <Redirect to="/add-profile" />;
	if (currentPet && isEmpty(pet)) setPet({ ...currentPet });

	const defaultWeigth =
		pet.species === "canine" ? 20 : pet.species === "feline" ? 10 : 0;

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Form
				state={pet}
				setState={setPet}
				fields={[
					["text", "name"],
					["select", "species", { options: ["canine", "feline"] }],
					["select", "sex", { options: ["male", "female"] }],
					["text", "breed"],
					[
						"group",
						"birthDate",
						{
							layout: "row",
							fields: [
								["number", "birthYear", { label: "Birth Year" }],
								["number", "birthMonth", { label: "Birth Month" }],
							],
						},
					],
					["number", "weight", { defaultVal: defaultWeigth }],
					["text", "microchip", { label: "Microchip number" }],
				]}
			/>
		</Container>
	);
};
