import * as $ from "redux/pets/pets-actions";
import { getPetId } from "redux/survey/survey-selectors";
import { clear } from "redux/survey/survey-actions";
import { demoPet } from "./demoPet";

export const cleanDeletePet = (data) => (dispatch, getState) => {
	const { id } = data;
	dispatch($.deletePet({ id }));
	const surveyPetId = getPetId(getState());
	if (surveyPetId === id) dispatch(clear());
};

export const addDemoPet = () => (dispatch) => dispatch($.addPet(demoPet));
