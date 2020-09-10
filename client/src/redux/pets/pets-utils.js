import { makeState } from "utils/state";
import {
	makeArrayWithModifiedItems,
	makeArrayWithReplacedItem,
} from "utils/array";
import dogImage from "assets/dog.png";
import catImage from "assets/cat.png";

export const makeModifiedPet = (state, id, modifier) => {
	const selector = (pet) => pet.id === id;
	return makeState(state, "list", (list) =>
		makeArrayWithModifiedItems(list, null, modifier, selector)
	);
};

export const makeStateWithModifiedPetReport = (state, id, petId, data) => {
	const selector = (report) => report.id === id;
	const modifier = (report) => ({ ...report, ...data });
	return makeModifiedPet(state, petId, (pet) =>
		makeState(pet, "reports", (reports) =>
			makeArrayWithReplacedItem(reports, selector, modifier)
		)
	);
};

export const getPetById = (id, pets) => pets.find((pet) => pet.id === id);

// Add default image if missing
export const convertPet = (pet) => {
	if (!pet) return null;
	let { imageUrl, species } = pet;
	if (!imageUrl) imageUrl = species === "canine" ? dogImage : catImage;
	return { ...pet, imageUrl };
};

export const convertPets = (pets) => pets.map(convertPet);

export const simplifyReports = (reports) =>
	reports.map((report) => {
		const { id, dateUpdated } = report;
		return { id, dateUpdated };
	});

export const simplifyPets = simplifyReports;
