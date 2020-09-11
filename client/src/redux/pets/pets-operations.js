import axios from "axios";
import * as $ from "./pets-actions";
import { getPetById, getAllPets, getReportById } from "./pets-selectors";
import { simplifyReports, simplifyPets } from "./pets-utils";
import { getPetId } from "redux/survey/survey-selectors";
import { clear as clearSurvey } from "redux/survey/survey-actions";
import { modify as modifyUser } from "redux/user/user-actions";
import { getIsVet } from "redux/user/user-selectors";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";
import { demoPet } from "./demoPet";

// -------------------- addDemoPet (local) -----------------------

export const addDemoPet = () => (dispatch) => dispatch($.addPet(demoPet));

// ------------------------- addPet -----------------------------

// POST pet to db
// add petId and update dateModified to user (server & redux)
// go to Pet page
export const addPet = ({ formData }) => async (dispatch, getState) => {
	const endpoint = "/api/pet/create";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.addStart());
	return axios
		.post(endpoint, data, config)
		.then((res) => {
			const { id, dateCreated } = res.data;
			dispatch($.addSuccess());
			dispatch($.addPet({ ...formData, id }));
			dispatch(modifyUser({ dateModified: dateCreated }));
			return;
		})
		.catch((err) => {
			dispatch($.addFail());
			dispatch(error(err));
		});
};

// ----------------- modifyPet & modifyAllPets ---------------------

// POST pet to db
// update dateModified of user (server & redux)
// go to Pet page
export const modifyPet = ({ id, formData }) => async (dispatch, getState) => {
	const endpoint = "/api/pet/update";
	const reqData = JSON.stringify({ id, formData });
	const config = getTokenConfig(getState());
	dispatch($.updateStart());
	return axios
		.post(endpoint, reqData, config)
		.then((res) => {
			const { dateUpdated } = res.data;
			const newFormData = { ...formData, dateUpdated };
			dispatch($.updateSuccess());
			dispatch($.modifyPet({ id, formData: newFormData }));
			dispatch(modifyUser({ dateModified: dateUpdated }));
			return;
		})
		.catch((err) => {
			dispatch($.updateFail());
			dispatch(error(err));
		});
};

export const modifyAllPets = (formData) => (dispatch, getState) => {
	const pets = getAllPets(getState());
	pets.forEach((pet) => dispatch(modifyPet({ id: pet.id, formData })));
};

// ----------------------- syncPets (vet) --------------------------

// Fetch pets not present locally or updated more recently
export const syncPets = () => (dispatch, getState) => {
	const endpoint = "/api/pet/sync";
	const pets = simplifyPets(getAllPets(getState()));
	const reqData = JSON.stringify({ pets });
	const config = getTokenConfig(getState());
	dispatch($.syncStart());
	axios
		.post(endpoint, reqData, config)
		.then((res) => {
			if (res.status === 201) {
				dispatch($.upToDate());
			} else {
				dispatch($.syncSuccess());
				const { diffs, pets } = res.data;
				if (pets) dispatch($.setList(pets));
				else if (diffs)
					diffs.forEach(({ isNew, data }) => {
						if (isNew) dispatch($.addPet(data));
						else dispatch($.modifyPet({ id: data.id, formData: data }));
					});
			}
			dispatch(syncAllReports());
		})
		.catch((err) => {
			dispatch($.syncFail());
			dispatch(error(err));
		});
};

// ------------------------ addReportToPet ----------------------------

// Add report to store (then go to Report page)
// Client: POST report and add id to pet doc (sync status shows on Report page)
export const addReportToPet = (data) => (dispatch, getState) => {
	const isVet = getIsVet(getState());
	dispatch($.addReportToPet(data));
	if (isVet) return;

	const { petId, id } = data;
	const endpoint = "/api/report/add";
	const reqData = JSON.stringify(data);
	const config = getTokenConfig(getState());
	dispatch($.sendReportStart({ id, petId }));
	axios
		.post(endpoint, reqData, config)
		.then(() => dispatch($.sendReportSuccess({ id, petId })))
		.catch((err) => {
			dispatch($.sendReportFail({ id, petId }));
			dispatch(error(err));
		});
};

// ---------------- syncReports & syncAllReports -------------------

// Fetch reports not present locally or updated more recently
export const syncReports = (petId) => (dispatch, getState) => {
	const endpoint = "/api/report/sync-all";
	const pet = getPetById(getState(), petId);
	const reports = pet.reports ? simplifyReports(pet.reports) : [];
	const reqData = JSON.stringify({ petId, reports });
	const config = getTokenConfig(getState());
	dispatch($.syncReportsStart({ petId }));
	axios
		.post(endpoint, reqData, config)
		.then((res) => {
			if (res.status === 201) {
				dispatch($.reportsUpToDate({ petId }));
			} else {
				dispatch($.syncReportsSuccess({ petId }));
				const { diffs } = res.data;
				diffs.forEach(({ isNew, data }) => {
					data = { ...data, sent: true };
					if (isNew) dispatch($.addReportToPet(data));
					else dispatch($.modifyReport(data));
				});
				dispatch($.sortReports({ petId }));
			}
		})
		.catch((err) => {
			dispatch($.syncReportsFail({ petId }));
			dispatch(error(err));
		});
};

export const syncAllReports = () => (dispatch, getState) => {
	const pets = getAllPets(getState());
	pets.forEach((pet) => (pet.id ? dispatch(syncReports(pet.id)) : null));
};

// ---------------------- modifyReport ---------------------------

// POST an update to report; spread data + dateUpdated in store on success
export const modifyReport = ({ id, update }) => (dispatch, getState) => {
	const endpoint = "/api/report/update";
	const reqData = JSON.stringify({ id, update });
	const config = getTokenConfig(getState());
	axios
		.post(endpoint, reqData, config)
		.then((res) => {
			const { dateUpdated } = res.data;
			const data = { ...update, dateUpdated };
			const petId = getReportById(getState(), id).petId;
			dispatch($.modifyReport({ id, petId, data }));
		})
		.catch((err) => {
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
