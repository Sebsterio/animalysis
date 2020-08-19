import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav } from "components/Nav";
import { Form, isFormFilled } from "components/Form";

import { defaultPet } from "./ProfileForm-defaultPet";
import getFormFields from "./ProfileForm-formData";
import { getDateFromAge, getAgeFromDate, limitDateToToday } from "utils/date";

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

export const ProfileForm = ({
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

	// Map aux props into permanent state props
	const useSetPet = (newPet) => {
		let { birthYear, birthMonth } = newPet;
		const { ageYears, ageMonths, ...prunedNewPet } = newPet;
		if (birthYear === pet.birthYear && birthMonth === pet.birthMonth) {
			const date = getDateFromAge(ageMonths || 0, ageYears || 0);
			({ year: birthYear, month: birthMonth } = date);
		}
		const { year, month } = limitDateToToday(birthMonth, birthYear);
		setPet({ ...prunedNewPet, birthYear: year, birthMonth: month });
	};

	// ---------------------- Selectors -----------------------

	// Is name unique name when adding new pet
	const isNameValid = (pet, matchedPet) =>
		isNameUnique(pet.name) || (matchedPet && pet.name === matchedPet.name);

	const canSubmit = () =>
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

	// Control form fields data with state
	const formFields = getFormFields({
		nameError: !isNameValid(pet, matchedPet) ? "Pet already added" : null,
	});

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Form
				state={getAugmentedPet()}
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
