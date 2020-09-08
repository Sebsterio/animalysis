import axios from "axios";
import * as $ from "redux/pets/pets-actions";
import { getPetId } from "redux/survey/survey-selectors";
import { clear as clearSurvey } from "redux/survey/survey-actions";
import { modify as modifyUser } from "redux/user/user-actions";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";
import { demoPet } from "./demoPet";

// -------------------- addDemoPet (local) -----------------------

export const addDemoPet = () => (dispatch) => dispatch($.addPet(demoPet));

// ------------------------- addPet -----------------------------

export const addPet = ({ formData, history }) => (dispatch, getState) => {
	const endpoint = "/api/pet/create";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.addStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			const { id, dateCreated } = res.data;
			dispatch($.addSuccess());
			dispatch($.addPet({ ...formData, id }));
			dispatch(modifyUser({ dateModified: dateCreated }));
			history.push("/pet/" + formData.name);
		})
		.catch((err) => {
			dispatch($.addFail());
			dispatch(error(err));
		});
};

// ------------------------ modifyPet ----------------------------

export const modifyPet = (data) => (dispatch, getState) => {
	const { id, formData, history } = data;
	const endpoint = "/api/pet/update";
	const reqData = JSON.stringify({ id, formData });
	const config = getTokenConfig(getState());
	dispatch($.updateStart());
	axios
		.post(endpoint, reqData, config)
		.then((res) => {
			const { dateUpdated } = res.data;
			const newFormData = { ...formData, dateUpdated };
			dispatch($.updateSuccess());
			dispatch($.modifyPet({ id, formData: newFormData }));
			dispatch(modifyUser({ dateModified: dateUpdated }));
			history.push("/pet/" + formData.name);
		})
		.catch((err) => {
			dispatch($.updateFail());
			dispatch(error(err));
		});
};

// ------------------------ deletePet ----------------------------

export const deletePet = (data) => (dispatch, getState) => {
	const { id } = data;
	dispatch($.deletePet({ id }));
	const surveyPetId = getPetId(getState());
	if (surveyPetId === id) dispatch(clearSurvey());
};
