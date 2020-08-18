import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav } from "components/Nav";
import { Form, isFormFilled, addErrors } from "components/Form";

import { formFields } from "./AddOrEditPet-formData";
import { defaultPet } from "./AddOrEditPet-defaultPet";
import { getDateFromAge, getAgeFromDate } from "utils/date";

/*******************************************************
 * Routing:
 * /edit-profile/real-pet -- init form with pet data
 * /edit-profile/typo     -- redirect to /not-found
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
	// router
	match,
	history,
	// store
	getPet,
	isNameUnique,
	// dispatch
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

	// Map aux props into usable state props
	const useSetPet = (newPet) => {
		let { birthYear, birthMonth } = newPet;
		const { ageYears, ageMonths, ...prunedNewPet } = newPet;
		if (birthYear === pet.birthYear && birthMonth === pet.birthMonth) {
			const date = getDateFromAge(ageMonths || 0, ageYears || 0);
			({ year: birthYear, month: birthMonth } = date);
		}
		setPet({ ...prunedNewPet, birthYear, birthMonth });
	};

	// ---------------------- Selectors -----------------------

	// Is name unique name when adding new pet
	const isNameValid = (pet, matchedPet) =>
		isNameUnique(pet.name) || (matchedPet && pet.name === matchedPet.name);

	const canSubmit =
		isFormFilled(formFields, pet) && isNameValid(pet, matchedPet);

	// Get state with added derrived props
	const getAugmentedPet = () => {
		const { birthYear, birthMonth } = pet;
		const age = getAgeFromDate(birthMonth, birthYear);
		const { years: ageYears, months: ageMonths } = age;
		return { ...pet, ageYears, ageMonths };
	};

	// ------------------- Routing & View --------------------

	if (name && !matchedPet) return <Redirect to="/not-found" />;

	// Include error status in fields data
	const controlledFormFields = addErrors(formFields, {
		name: {
			isError: !isNameValid(pet, matchedPet),
			message: "Pet already added",
		},
	});

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Form
				state={getAugmentedPet()}
				setState={useSetPet}
				fields={controlledFormFields}
			/>
			<div className={clx.footer}>
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight="Save"
					onClickRight={submitForm}
					disabledRight={!canSubmit}
					noArrows
				/>
			</div>
		</Container>
	);
};
