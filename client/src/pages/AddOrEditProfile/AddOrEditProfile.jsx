import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Form } from "components/Form";
import { Nav } from "components/Nav";

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
	footer: {
		marginTop: theme.spacing(4),
	},
}));

const getCurrentYear = () => 2020;

const defaultPet = {
	birthYear: getCurrentYear(),
	weight: 0,
};

export const AddOrEditProfile = ({
	match,
	history,
	getPet,
	addPet,
	modifyPet,
}) => {
	const clx = useStyles();

	// Load edited-pet data OR assign default values
	const { name } = match.params;
	const matchedPet = name ? getPet(name) : null;
	const [pet, setPet] = useState(
		matchedPet ? { ...matchedPet } : { ...defaultPet }
	);

	// ---------------------- Handlers -----------------------

	const closeForm = () => {
		if (!matchedPet) history.push("/");
		else history.push("/profile/" + matchedPet.name);
	};

	const submitForm = () => {
		if (!matchedPet) addPet(pet);
		else modifyPet({ id: matchedPet.id, data: pet });
		history.push("/profile/" + pet.name);
	};

	// ------------------- Routing & View --------------------

	if (name && !matchedPet) return <Redirect to="/not-found" />;

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
					["number", "weight"],
					["text", "microchip", { label: "Microchip number" }],
				]}
			/>
			<div className={clx.footer}>
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight="Save"
					onClickRight={submitForm}
					noArrows
				/>
			</div>
		</Container>
	);
};
