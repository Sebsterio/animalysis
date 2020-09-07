import axios from "axios";
import * as $ from "./user-actions";
import * as profileActions from "redux/profile/profile-actions";
import * as userActions from "redux/user/user-actions";
import * as clinicActions from "redux/clinic/clinic-actions";
import * as petsActions from "redux/pets/pets-actions";
import * as surveyActions from "redux/survey/survey-actions";
// import * as surveyDataActions from "redux/survey-data/survey-data-actions";

import { fetchOrganisation } from "redux/clinic/clinic-operations";
import { syncSurvey } from "redux/survey-data/survey-data-operations";
import { getDateModified, getIsAuthenticated } from "./user-selectors";
import { error } from "redux/error/error-operations";
import { getConfig, getTokenConfig } from "utils/ajax";

// ------------------- createUser (sing-up) ----------------------

// Create new User and get token
// Spread data in user and profile store
// If error, sign out (clear all stores)
export const signUp = (formData) => async (dispatch) => {
	const { firstName } = formData;
	const endpoint = "/api/user/sign-up";
	const data = JSON.stringify(formData);
	const config = getConfig();
	dispatch($.createStart());
	return axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.createSuccess(res.data));
			dispatch(profileActions.modify({ firstName }));
		})
		.catch((err) => {
			dispatch($.createFail());
			dispatch(signOut());
			dispatch(error(err));
		});
};

// ------------------- signIn -----------------------

// Exchange credentials for token
// Set (replace) received data in user, profile, clinic, pets store
// Sync survey
export const signIn = (formData) => (dispatch) => {
	const endpoint = "/api/user/sign-in";
	const data = JSON.stringify(formData);
	const config = getConfig();
	dispatch($.fetchStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			const { type, profile, clinic } = res.data;
			dispatch($.fetchSuccess(res.data));
			dispatch(profileActions.set(profile));
			if (["vet", "superuser"].includes(type))
				dispatch(fetchOrganisation(clinic.id));
			else dispatch(clinicActions.set(clinic));
			// TODO: set pets
			dispatch(syncSurvey());
		})
		.catch((err) => {
			dispatch($.fetchFail());
			dispatch(error(err));
		});
};

// -------------------- syncData -----------------------

// GET user data if newer than local
// Set (replace) received data in user, profile, clinic, pets store
// Sync survey
export const syncData = () => (dispatch, getState) => {
	const signedIn = getIsAuthenticated(getState());
	if (!signedIn) return;

	const endpoint = "/api/user";
	const dateModified = getDateModified(getState());
	const data = JSON.stringify({ dateModified });
	const config = getTokenConfig(getState());
	dispatch($.syncStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			if (res.status === 201) return dispatch($.upToDate());
			const { type, profile, clinic } = res.data;
			dispatch($.fetchSuccess(res.data));
			dispatch(profileActions.set(profile));
			if (["vet", "superuser"].includes(type))
				dispatch(fetchOrganisation(clinic.id));
			else dispatch(clinicActions.set(clinic));
			// TODO: set pets
			dispatch(syncSurvey());
		})
		.catch((err) => {
			// 409 impossible as all changes pass through db
			dispatch($.syncFail());
			dispatch(error(err));
		});
};

// -------------------------- updateUser ------------------------------

// POST user data to db
// Set dateModified in user store
export const updateUser = (formData) => (dispatch, getState) => {
	const endpoint = "/api/user/update";
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

// Delete all user-related docs; Restart app
export const closeAccount = (formData) => (dispatch, getState) => {
	const token = getTokenConfig(getState());
	dispatch($.deleteStart());
	axios
		.post("/api/user/delete", JSON.stringify(formData), token)
		.then(() => {
			dispatch($.deleteSuccess());
			dispatch(signOut());
		})
		.catch((err) => {
			dispatch($.deleteFail());
			dispatch(error(err));
		});
};

// ---------------------------- signOut ---------------------------------

// Clear store and persistor;
export const signOut = () => (dispatch) => {
	dispatch(userActions.clear());
	dispatch(profileActions.clear());
	dispatch(clinicActions.clear());
	dispatch(petsActions.clear());
	dispatch(surveyActions.clear());
	localStorage.clear();
};
