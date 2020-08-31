import axios from "axios";
import * as $ from "./user-actions";
import { setError } from "redux/error/error-actions";
import { getIsSignedIn, getDateModified } from "./user-selectors";
import { getConfig, getTokenConfig } from "utils/ajax";

// ------------------------ signIn ------------------------------

// Exchange password for token
export const signIn = (formData) => (dispatch) => {
	const endpoint = "/api/auth/sign-in";
	const data = JSON.stringify(formData);
	const config = getConfig();
	dispatch($.signInStart());
	axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.signInSuccess(res.data)))
		.catch((err) => {
			dispatch($.signInFail());
			dispatch(setError(err));
		});
};

// ------------------------ signUp ------------------------------

// Create new user and get token
export const signUp = (formData) => (dispatch) => {
	const endpoint = "/api/auth/sign-up";
	const data = JSON.stringify(formData);
	const config = getConfig();
	dispatch($.signUpStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.signUpSuccess(res.data));
			// TODO: add name to profile store
		})
		.catch((err) => {
			dispatch($.signUpFail());
			dispatch(setError(err));
		});
};

// --------------------------- syncUser ------------------------------

// GET user data if newer than local
// If older, resolve conflict
export const syncUser = () => (dispatch, getState) => {
	if (!getIsSignedIn(getState())) return;

	const endpoint = "/api/auth";
	const dateModified = getDateModified(getState());
	const data = JSON.stringify({ dateModified });
	const config = getTokenConfig(getState());
	dispatch($.syncStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			if (res.status === 201) return dispatch($.upToDate());
			if (res.status === 200) return dispatch($.syncSuccess(res.data));
		})
		.catch((err) => {
			dispatch($.syncFail());
			dispatch(setError(err));
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
			dispatch(setError(err));
		});
};

// --------------------------- signOut --------------------------------

// Clear store and persistor;
export const signOut = () => (dispatch) => {
	dispatch($.clearUser());
	localStorage.clear();
};

// -------------------------- deleteUser ------------------------------

// DELETE user from db
export const deleteUser = (formData) => (dispatch, getState) => {
	const token = getTokenConfig(getState());
	dispatch($.deleteStart());
	axios
		.post("/api/auth/delete", JSON.stringify(formData), token)
		.then(() => {
			dispatch($.deleteSuccess());
			dispatch(signOut());
		})
		.catch((err) => {
			dispatch($.deleteFail());
			dispatch(setError(err));
		});
};
