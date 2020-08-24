import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav, Form, isFormFilled, ConfirmDialog } from "components";

import { defaultPet } from "./PetForm-defaultPet";
import getFormFields from "./PetForm-formData";
import {
	mapAgeToBirthDate,
	limitBirthDateToToday,
	mapBirthDateToAge,
	convertFileToBlob,
	mapKgToLbs,
	mapLbsToKg,
} from "./PetForm-utils";

/*******************************************************
 * Routing:
 * /edit-pet/real-pet -- init form with pet data
 * /edit-pet/typo     -- redirect to /not-found
 * /add-pet           -- init empty form
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

export const PetForm = ({
	// router
	match,
	history,
	// store
	getPet,
	isNameUnique,
	// dispatch
	addPet,
	modifyPet,
	deletePet,
}) => {
	const clx = useStyles();

	// Load edited-pet data OR assign default values
	const { name } = match.params;
	const matchedPet = name ? getPet(name) : null;
	const [pet, setPet] = useState(
		matchedPet ? { ...matchedPet } : { ...defaultPet }
	);

	// Set up toggle-able section controls
	const [toggle, setToggle] = useState({ age: true, kg: true });
	const toggleState = (prop) => setToggle({ ...toggle, [prop]: !toggle[prop] });

	// Confirmation dialog
	const [dialogOpen, setDialogOpen] = useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	// ---------------------- Handlers -----------------------

	const closeForm = () => {
		if (!matchedPet) history.push("/");
		else history.push("/pet/" + matchedPet.name);
	};

	const submitForm = () => {
		if (!matchedPet) addPet(pet);
		else modifyPet({ id: matchedPet.id, data: pet });
		history.push("/pet/" + pet.name);
	};

	const handleDelete = () => {
		deletePet({ id: pet.id });
		history.push("/");
	};

	// Add side-effects to form onChange handler
	const useSetPet = (newPet) => {
		newPet = convertFileToBlob(newPet);
		newPet = mapLbsToKg(pet, newPet);
		newPet = mapAgeToBirthDate(pet, newPet);
		newPet = limitBirthDateToToday(newPet);
		setPet(newPet);
	};

	// ---------------------- Selectors -----------------------

	// Is name unique when adding new pet
	const isNewNameUnique = (pet, matchedPet) =>
		isNameUnique(pet.name) || (matchedPet && pet.name === matchedPet.name);

	const canSubmit = () =>
		isFormFilled(formFields, pet) && isNewNameUnique(pet, matchedPet);

	// Get state with added derrived props
	const getAugmentedPet = (pet) => {
		pet = mapKgToLbs(pet);
		pet = mapBirthDateToAge(pet);
		return pet;
	};

	// ------------------- Routing & View --------------------

	if (name && !matchedPet) return <Redirect to="/not-found" />;

	const formFields = getFormFields({
		hasPhoto: !!pet.imageUrl,
		nameError: !isNewNameUnique(pet, matchedPet) ? "Pet already added" : null,
		showAge: toggle.age,
		toggleShowAge: () => toggleState("age"),
		showKg: toggle.kg,
		toggleShowKg: () => toggleState("kg"),
		isSaved: !!pet.id,
		deletePet: openDialog,
	});

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Form
				state={getAugmentedPet(pet)}
				setState={useSetPet}
				fields={formFields}
			/>

			<ConfirmDialog
				title="Caution!"
				text="This will permanently delete your pet's profile and all associated data. Do you want to proceed?"
				buttonColor={["primary", "secondary"]}
				isOpen={dialogOpen}
				close={closeDialog}
				confirm={handleDelete}
			/>

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
