import { makeState } from "utils/state";
import { makeArrayWithModifiedItems } from "utils/array";
import dogImage from "assets/dog.png";
import catImage from "assets/cat.png";

export const makeModifiedPet = (state, id, modifier) => {
	const selector = (pet) => pet.id === id;
	return makeState(state, "list", (list) =>
		makeArrayWithModifiedItems(list, null, modifier, selector)
	);
};

// Add default image if missing
export const convertPet = (pet) => {
	let { imageUrl, species } = pet;
	if (!imageUrl) imageUrl = species === "canine" ? dogImage : catImage;
	return { ...pet, imageUrl };
};

export const convertPets = (pets) => pets.map(convertPet);
