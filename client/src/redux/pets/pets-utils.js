import { makeState } from "utils/state";
import { makeArrayWithModifiedItems } from "utils/array";

export const makeModifiedPet = (state, id, modifier) => {
	const selector = (pet) => pet.id === id;
	return makeState(state, "list", (list) =>
		makeArrayWithModifiedItems(list, null, modifier, selector)
	);
};
