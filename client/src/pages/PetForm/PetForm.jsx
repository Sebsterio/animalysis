import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav } from "components/Nav";
import { Form, isFormFilled } from "components/Form";

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

	// Is name unique name when adding new pet
	const isNameValid = (pet, matchedPet) =>
		isNameUnique(pet.name) || (matchedPet && pet.name === matchedPet.name);

	const canSubmit = () =>
		isFormFilled(formFields, pet) && isNameValid(pet, matchedPet);

	// Get state with added derrived props
	const getAugmentedPet = (pet) => {
		pet = mapKgToLbs(pet);
		pet = mapBirthDateToAge(pet);
		return pet;
	};

	// ------------------- Routing & View --------------------

	if (name && !matchedPet) return <Redirect to="/not-found" />;

	const formFields = getFormFields({
		nameError: !isNameValid(pet, matchedPet) ? "Pet already added" : null,
		showAge: toggle.age,
		toggleShowAge: () => toggleState("age"),
		showKg: toggle.kg,
		toggleShowKg: () => toggleState("kg"),
		isSaved: !!pet.id,
		deletePet: handleDelete,
	});

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Form
				state={getAugmentedPet(pet)}
				setState={useSetPet}
				fields={formFields}
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
