import axios from "axios";
import * as $ from "./profile-actions";
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

// // --------------------------- syncUser ------------------------------

// // GET user data if newer than local
// // If older, resolve conflict
// export const syncUser = () => (dispatch, getState) => {
// 	const signedIn = getIsAuthenticated(getState());
// 	if (!signedIn) return;

// 	const endpoint = "/api/auth";
// 	const dateModified = getDateModified(getState());
// 	const data = JSON.stringify({ dateModified });
// 	const config = getTokenConfig(getState());
// 	dispatch($.syncStart());
// 	axios
// 		.post(endpoint, data, config)
// 		.then((res) => {
// 			if (res.status === 201) return dispatch($.upToDate());
// 			if (res.status === 200) return dispatch($.syncSuccess(res.data));
// 			// on 200 also return profile, clinic, pets
// 		})
// 		.catch((err) => {
// 			// on conflict, post profile, clinic, pets, user (dateModified update only)
// 			// no  confirm
// 			dispatch($.syncFail());
// 			dispatch(error(err));
// 		});
// };

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
