import axios from "axios";
import * as $ from "./clinic-actions";
import { getDateModified, getClinicId } from "./clinic-selectors";
import { updateProfile } from "redux/profile/profile-operations";
import { getClinicInfo } from "redux/profile/profile-selectors";
import { getIsVet } from "redux/user/user-selectors";
import { error } from "redux/error/error-operations";
import { getConfig, getTokenConfig } from "utils/ajax";

// ============================ Pet owner ===================================

// Update user profile clinic section
export const updateClinic = (formData) => (dispatch) => {
	dispatch($.modifyClinic(formData));
	dispatch(updateProfile({ clinicInfo: formData }));
};

// Remove clinicId from profile and set profile clinicInfo in clinic store
export const leaveClinic = () => (dispatch, getState) => {
	const clinicInfo = getClinicInfo(getState());
	dispatch(updateProfile({ clinicId: null }));
	dispatch($.setClinic(clinicInfo));
};

// Link a registered clinic to profile
export const joinClinic = ({ data }) => (dispatch) => {
	const clinicId = data.id;
	dispatch(updateProfile({ clinicId }));
	dispatch($.setClinic(data));
};

// =============================== All ======================================

// POST search query and get a list of clinics
export const fetchClinics = (queryData) => async (dispatch, getState) => {
	const endpoint = "/api/clinic/search";
	const data = JSON.stringify(queryData);
	const config = getConfig(getState());
	return axios
		.post(endpoint, data, config)
		.then((res) => res.data)
		.catch((err) => dispatch(error(err)));
};

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

// GET clinic data if newer than local
export const fetchOrganisation = (clinicId) => async (dispatch, getState) => {
	const endpoint = "/api/clinic";
	const dateModified = getDateModified(getState());
	const isVet = getIsVet(getState());
	const data = JSON.stringify({ dateModified, clinicId, isVet });
	const config = getTokenConfig(getState());
	dispatch($.fetchStart());
	return axios
		.post(endpoint, data, config)
		.then((res) => {
			if (res.status === 201) dispatch($.upToDate());
			else dispatch($.fetchSuccess(res.data));
			return res; // used in ClinicSearch to determine if vet is member
		})
		.catch((err) => {
			dispatch($.fetchFail());
			dispatch($.clear());
			dispatch(error(err));
		});
};

// =============================== Vet ======================================

// ------------------------ leaveOrganisation ------------------------------

// Remove clinicId from profile and clear clinic store
export const leaveOrganisation = () => (dispatch, getState) => {
	dispatch(updateProfile({ clinicId: null }));
	dispatch($.clear());
};

// ------------------------ joinOrganisation ------------------------------

// Attempt to fetch clinic data
export const joinOrganisation = ({ history, data }) => async (dispatch) => {
	const clinicId = data.id;
	dispatch(updateProfile({ clinicId }));
	const res = await dispatch(fetchOrganisation(clinicId));
	if (!!res) history.push("/my-clinic");
};

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
	dispatch($.modifyClinic(formData));
	dispatch($.updateStart());
	axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.updateSuccess(res.data)))
		.catch((err) => {
			dispatch($.updateFail());
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
