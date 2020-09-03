import axios from "axios";
import * as $ from "./clinic-actions";
import { getDateModified, getClinicId } from "./clinic-selectors";
import { updateProfile } from "redux/profile/profile-operations";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";

// ============================ Pet owner ===================================

// Update user profile clinic section
export const updateClinic = (formData) => (dispatch) => {
	dispatch($.modifyClinic(formData));
	dispatch(updateProfile({ clinicInfo: formData }));
};

// =============================== All ======================================

// Handle data fetched from profile
// If user's clinic is registered (id exists), sync it
// Else save clinic-data fetched from profile
// prettier-ignore
export const syncClinic = (profileRes) => (dispatch, getState) => {
	let clinicInfo, clinicId
	if (profileRes) ({ clinicInfo, clinicId } = profileRes.data);
	if (!clinicId) clinicId = getClinicId(getState());
	if (clinicId) dispatch(fetchOrganisation(clinicId));
	else if (clinicInfo) dispatch($.setClinic(clinicInfo));
};

// =============================== Vet ======================================

// ------------------------ createOrganisation ------------------------------

export const createOrganisation = (formData) => (dispatch, getState) => {
	const endpoint = "/api/clinic/create";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.modifyClinic(formData));
	dispatch($.createStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.createSuccess(res.data));
			dispatch(updateProfile({ clinicId: res.data.id, clinicInfo: {} }));
		})
		.catch((err) => {
			dispatch($.createFail());
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
	// dispatch($.modifyClinic(formData));
	dispatch($.updateStart());
	axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.updateSuccess(res.data)))
		.catch((err) => {
			dispatch($.updateFail());
			dispatch(error(err));
		});
};

// --------------------------- fetchOrganisation ------------------------------

// GET clinic data if newer than local
export const fetchOrganisation = (clinicId) => (dispatch, getState) => {
	const endpoint = "/api/clinic";
	const dateModified = getDateModified(getState());
	const data = JSON.stringify({ dateModified, clinicId });
	const config = getTokenConfig(getState());
	dispatch($.fetchStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			if (res.status === 201) return dispatch($.upToDate());
			dispatch($.fetchSuccess(res.data));
		})
		.catch((err) => {
			dispatch($.fetchFail());
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
