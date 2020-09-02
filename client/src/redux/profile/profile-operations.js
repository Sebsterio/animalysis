import axios from "axios";
import * as $ from "./profile-actions";
import { getDateUpdated } from "./profile-selectors";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";

// ------------------------ createProfile ------------------------------

export const createProfile = (formData) => (dispatch, getState) => {
	const endpoint = "/api/profile/create";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.createStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.createSuccess(res.data));
		})
		.catch((err) => {
			dispatch($.createFail());
			dispatch(error(err));
		});
};

// -------------------------- updateProfile ------------------------------

// POST profile data to db
export const updateProfile = (formData) => (dispatch, getState) => {
	const endpoint = "/api/profile/update";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.modify(formData));
	dispatch($.updateStart());
	axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.updateSuccess(res.data)))
		.catch((err) => {
			dispatch($.updateFail());
			dispatch(error(err));
		});
};

// --------------------------- fetchProfile ------------------------------

// GET profile data if newer than local
// If user has a clinic linked to profile, fetch it
// Else, if user is not vet, set clinic data from profile-clinic
export const fetchProfile = () => async (dispatch, getState) => {
	const endpoint = "/api/profile";
	const dateUpdated = getDateUpdated(getState());
	const data = JSON.stringify({ dateUpdated });
	const config = getTokenConfig(getState());
	dispatch($.fetchStart());
	return axios
		.post(endpoint, data, config)
		.then((res) => {
			if (res.status === 201) dispatch($.upToDate());
			else dispatch($.fetchSuccess(res.data));
			return res; // pass clinicInfo/clinicId back to session-ops
		})
		.catch((err) => {
			dispatch($.fetchFail());
			dispatch(error(err));
		});
};

// -------------------------- deleteProfile ------------------------------

// DELETE profile from db
export const deleteProfile = () => async (dispatch, getState) => {
	const token = getTokenConfig(getState());
	dispatch($.deleteStart());
	return axios
		.delete("/api/profile", token)
		.then(() => dispatch($.deleteSuccess()))
		.catch((err) => {
			dispatch($.deleteFail());
			dispatch(error(err));
		});
};
