import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Form } from "components/Form";
import { Nav } from "components/Nav";
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
	footer: {
		marginTop: theme.spacing(4),
	},
}));

export const AddOrEditProfile = ({
	match,
	history,
	getPet,
	addPet,
	modifyPet,
}) => {
	const [pet, setPet] = useState({});
	const clx = useStyles();

	const { name } = match.params;
	const currentPet = name ? getPet(name) : null;

	useEffect(() => {
		if (currentPet && isEmpty(pet)) return setPet({ ...currentPet });
	}, [pet, setPet]);

	if (name && !currentPet) return <Redirect to="/add-profile" />;

	const closeForm = () => history.goBack();

	const submitForm = () => {
		if (pet.id) modifyPet(pet);
		else addPet(pet);
		closeForm();
	};

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
