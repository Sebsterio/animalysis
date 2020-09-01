import axios from "axios";
import * as $ from "./profile-actions";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";

// ------------------------ createProfile ------------------------------

export const createProfile = (formData) => (dispatch, getState) => {
	console.log({ formData });
	const endpoint = "/api/profile/create";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.createProfileStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.createProfileSuccess(res.data));
		})
		.catch((err) => {
			dispatch($.createProfileFail());
			dispatch(error(err));
		});
};

// // --------------------------- syncUser ------------------------------

// // GET user data if newer than local
// // If older, resolve conflict
// export const syncUser = () => (dispatch, getState) => {
// 	const signedIn = getIsSignedIn(getState());
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

// // -------------------------- updateUser ------------------------------

// // POST user data to db
// export const updateUser = (formData) => (dispatch, getState) => {
// 	const endpoint = "/api/auth/update";
// 	const data = JSON.stringify(formData);
// 	const config = getTokenConfig(getState());
// 	dispatch($.updateStart());
// 	axios
// 		.post(endpoint, data, config)
// 		.then((res) => dispatch($.updateSuccess(res.data)))
// 		.catch((err) => {
// 			dispatch($.updateFail());
// 			dispatch(error(err));
// 		});
// };

// // --------------------------- signOut --------------------------------

// // Clear store and persistor;
// export const signOut = () => (dispatch) => {
// 	dispatch($.clearUser());
// 	localStorage.clear();
// };

// // -------------------------- deleteUser ------------------------------

// // DELETE user from db
// export const deleteUser = (formData) => (dispatch, getState) => {
// 	const token = getTokenConfig(getState());
// 	dispatch($.deleteStart());
// 	axios
// 		.post("/api/auth/delete", JSON.stringify(formData), token)
// 		.then(() => {
// 			dispatch($.deleteSuccess());
// 			dispatch(signOut());
// 		})
// 		.catch((err) => {
// 			dispatch($.deleteFail());
// 			dispatch(error(err));
// 		});
// };
