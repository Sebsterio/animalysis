import axios from "axios";
import * as $ from "./user-actions";
import { getDateModified } from "./user-selectors";
import { error } from "redux/error/error-operations";
import { getConfig, getTokenConfig } from "utils/ajax";

// ---------------------- createUser -----------------------------

// Create new User and get token
export const createUser = (formData) => async (dispatch) => {
	const endpoint = "/api/auth/sign-up";
	const data = JSON.stringify(formData);
	const config = getConfig();
	dispatch($.createStart());
	return axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.createSuccess(res.data)))
		.catch((err) => {
			dispatch($.createFail());
			dispatch(error(err));
		});
};

// ----------------------- fetchUser -----------------------------

// Exchange password for token and updated user data
export const fetchUser = (formData) => async (dispatch) => {
	const endpoint = "/api/auth/sign-in";
	const data = JSON.stringify(formData);
	const config = getConfig();
	dispatch($.fetchStart());
	return axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.fetchSuccess(res.data)))
		.catch((err) => {
			dispatch($.fetchFail());
			dispatch(error(err));
		});
};

// ------------------------- syncUser ----------------------------

// GET user data if newer than local
export const syncUser = () => async (dispatch, getState) => {
	const endpoint = "/api/auth";
	const dateModified = getDateModified(getState());
	const data = JSON.stringify({ dateModified });
	const config = getTokenConfig(getState());
	dispatch($.syncStart());
	return axios
		.post(endpoint, data, config)
		.then((res) => {
			if (res.status === 201) return dispatch($.upToDate());
			return dispatch($.syncSuccess(res.data));
		})
		.catch((err) => {
			// 409 impossible as all changes pass through db
			dispatch($.syncFail());
			dispatch(error(err));
		});
};

// -------------------------- updateUser ------------------------------

// POST user data to db
export const updateUser = (formData) => (dispatch, getState) => {
	const endpoint = "/api/auth/update";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.updateStart());
	axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.updateSuccess(res.data)))
		.catch((err) => {
			dispatch($.updateFail());
			dispatch(error(err));
		});
};

// -------------------------- deleteUser ------------------------------

// DELETE user from db
export const deleteUser = (formData) => async (dispatch, getState) => {
	const token = getTokenConfig(getState());
	dispatch($.deleteStart());
	return axios
		.post("/api/auth/delete", JSON.stringify(formData), token)
		.then(async () => dispatch($.deleteSuccess()))
		.catch((err) => {
			dispatch($.deleteFail());
			dispatch(error(err));
		});
};
