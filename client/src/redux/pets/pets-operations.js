import * as $ from "redux/pets/pets-actions";
import { getPetId } from "redux/survey/survey-selectors";
import { clearSurvey } from "redux/survey/survey-actions";

export const cleanDeletePet = (data) => (dispatch, getState) => {
	const { id } = data;
	dispatch($.deletePet({ id }));
	const surveyPetId = getPetId(getState());
	if (surveyPetId === id) dispatch(clearSurvey());
};
