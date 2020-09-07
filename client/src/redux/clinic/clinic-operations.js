import axios from "axios";
import * as $ from "./clinic-actions";
import { getClinicId } from "./clinic-selectors";
import { updateUser } from "redux/user/user-operations";
import { getIsVet } from "redux/user/user-selectors";
import { syncSurvey } from "redux/survey-data/survey-data-operations";
import { error } from "redux/error/error-operations";
import { getConfig, getTokenConfig } from "utils/ajax";

// ========================= Pet-owner ==========================

// PET_OWNER
// Update user clinicInfo prop
export const updateClinicInfo = (formData) => (dispatch) => {
	dispatch($.modify(formData));
	const userFormData = { clinicInfo: formData };
	dispatch(updateUser(userFormData));
};

// ============================ All =============================

// ------------------------ fetchClinics ------------------------------

// POST search query and get a list of clinics (limited details)
export const fetchClinics = (queryData) => async (dispatch, getState) => {
	const endpoint = "/api/clinic/search";
	const data = JSON.stringify(queryData);
	const config = getConfig(getState());
	return axios
		.post(endpoint, data, config)
		.then((res) => res.data)
		.catch((err) => dispatch(error(err)));
};

// ------------------------ joinClinic ------------------------------

// Link a registered clinic to profile
// Pet-owner: set clinic details in store
// Vet: Attempt to fetch full clinic data (must be member; error -> feedback)
// Got /my-clinic
export const joinClinic = ({ history, data }) => async (dispatch, getState) => {
	const isVet = getIsVet(getState());
	const clinicId = data.id;
	if (isVet) {
		const res = await dispatch(fetchOrganisation(clinicId));
		if (!res) return;
	} else dispatch($.set(data));
	await dispatch(updateUser({ clinicId, clinicInfo: {} }));
	dispatch(syncSurvey()); // after updateUser (response sets clinicId)
	history.push("/my-clinic");
};

// ------------------------ leaveClinic ------------------------------

// Remove clinicId from profile and clear clinic store
export const leaveClinic = () => (dispatch) => {
	dispatch(updateUser({ clinicId: null }));
	dispatch($.clear());
};

// ============================ Vet =============================

// ------------------------ fetchOrganisation ------------------------------

// GET clinic data if newer than local
export const fetchOrganisation = (clinicId) => async (dispatch, getState) => {
	const endpoint = "/api/clinic";
	const data = JSON.stringify({ clinicId });
	const config = getTokenConfig(getState());
	dispatch($.fetchStart());
	return axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.fetchSuccess(res.data));
			return res; // used in ClinicSearch to determine if vet is member
		})
		.catch((err) => {
			dispatch($.fetchFail());
			dispatch($.clear());
			dispatch(error(err));
		});
};

// -------------------------- updateOrganisation ------------------------------

// POST clinic data to db
export const updateOrganisation = (formData) => (dispatch, getState) => {
	const endpoint = "/api/clinic/update";
	const clinicId = getClinicId(getState());
	const data = JSON.stringify({ ...formData, clinicId });
	const config = getTokenConfig(getState());
	dispatch($.updateStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.updateSuccess(res.data)); // dateModified
			dispatch($.modify(formData)); // rest
		})
		.catch((err) => {
			dispatch($.updateFail());
			dispatch(error(err));
		});
};

// ------------------------ createOrganisation ------------------------------

export const createOrganisation = (formData) => (dispatch, getState) => {
	const endpoint = "/api/clinic/create";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.modify(formData));
	dispatch($.createStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.createSuccess(res.data));
			dispatch(updateUser({ clinicId: res.data.id, clinicInfo: {} }));
		})
		.catch((err) => {
			dispatch($.createFail());
			dispatch(error(err));
		});
};

// -------------------------- deleteOrganisation ------------------------------

// DELETE profile from db
export const deleteOrganisation = () => async (dispatch, getState) => {
	const config = getTokenConfig(getState());
	const clinicId = getClinicId(getState());
	const data = JSON.stringify({ clinicId });
	dispatch($.deleteStart());
	return axios
		.post("/api/clinic/delete", data, config)
		.then(() => {
			dispatch($.deleteSuccess());
			dispatch($.clear());
		})
		.catch((err) => {
			dispatch($.deleteFail());
			dispatch(error(err));
		});
};
