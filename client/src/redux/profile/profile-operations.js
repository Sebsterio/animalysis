import axios from "axios";
import * as $ from "./profile-actions";
import { getDateUpdated } from "./profile-selectors";
import { setClinic } from "redux/clinic/clinic-actions";
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
		.then((res) => {
			dispatch($.updateSuccess(res.data));
		})
		.catch((err) => {
			dispatch($.updateFail());
			dispatch(error(err));
		});
};

// // --------------------------- fetchProfile ------------------------------

// GET profile & profile-clinic data if newer than local
export const fetchProfile = () => (dispatch, getState) => {
	const endpoint = "/api/profile";
	const dateUpdated = getDateUpdated(getState());
	const data = JSON.stringify({ dateUpdated });
	const config = getTokenConfig(getState());
	dispatch($.fetchStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			if (res.status === 201) return dispatch($.upToDate());
			dispatch($.fetchSuccess(res.data));
			const { clinicInfo } = res.data;
			if (clinicInfo) dispatch(setClinic(clinicInfo));
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
