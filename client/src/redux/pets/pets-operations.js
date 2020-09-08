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

// POST pet to db
// add petId and update dateModified to user (server & redux)
// go to Pet page
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

// POST pet to db
// update dateModified of user (server & redux)
// go to Pet page
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

// ------------------------ addReportToPet ----------------------------

// Add report to store and go to path report/:id
// POST report and add id to pet doc
// Update dateUpdated in pet redux
export const addReportToPet = (data) => (dispatch, getState) => {
	const { petId, id } = data;
	const endpoint = "/api/pet/report";
	const reqData = JSON.stringify(data);
	const config = getTokenConfig(getState());
	dispatch($.addReportToPet(data));
	dispatch($.sendReportStart({ id, petId }));
	axios
		.post(endpoint, reqData, config)
		.then((res) => {
			const { dateUpdated } = res.data;
			dispatch($.sendReportSuccess({ id, petId }));
			dispatch($.modifyPet({ id, formData: { dateUpdated } }));
		})
		.catch((err) => {
			dispatch($.sendReportFail({ id, petId }));
			dispatch(error(err));
		});
};

// ------------------------ deletePet ----------------------------

// DELETE pet from db
// remove petId from user and update dateModified (server & redux)
// clear survey if it was initialized for the deleted pet
// go to Home
export const deletePet = ({ id, history }) => (dispatch, getState) => {
	const endpoint = `/api/pet/${id}`;
	const config = getTokenConfig(getState());
	dispatch($.deleteStart());
	axios
		.delete(endpoint, config)
		.then((res) => {
			const { dateModified } = res.data;
			dispatch($.deleteSuccess());
			dispatch($.deletePet({ id }));
			dispatch(modifyUser({ dateModified }));
			const surveyPetId = getPetId(getState());
			if (surveyPetId === id) dispatch(clearSurvey());
			history.push("/");
		})
		.catch((err) => {
			dispatch($.deleteFail());
			dispatch(error(err));
		});
};
