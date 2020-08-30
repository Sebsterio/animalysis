import axios from "axios";
import * as $ from "./user-actions";
import { setError } from "redux/error/error-actions";
import { getUser, getDateModified, getToken } from "./user-selectors";
import { getConfig, getTokenConfig } from "utils/ajax";
import { userSyncConflictMsg } from "config/messages";

// ------------------------ signIn ------------------------------

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

// Get user data if newer than local
// If not found, clear user store
export const syncUser = () => (dispatch, getState) => {
	if (!getToken(getState())) return;

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
			const res = err.response;
			if (res.status === 409) {
				const overwriteRemote = window.confirm(userSyncConflictMsg);
				if (!overwriteRemote) return dispatch($.syncSuccess(res.data));
				dispatch($.syncCanceled(res.data));
				dispatch(updateUser());
			} else {
				dispatch($.syncFail());
				dispatch(setError(err));
			}
		});
};

// -------------------------- updateUser -----------------------------

// POST local data to db
export const updateUser = () => (dispatch, getState) => {
	const endpoint = "/api/auth/update";
	const data = JSON.stringify(getUser(getState()));
	const config = getTokenConfig(getState());
	dispatch($.updateStart());
	axios
		.post(endpoint, data, config)
		.then(() => dispatch($.updateSuccess()))
		.catch((err) => {
			dispatch($.updateFail());
			dispatch(setError(err));
		});
};

// // -------------------------- logout -------------------------------

// // Clear store and persistor; fresh start
// export const logout = () => (dispatch) => {
// 	dispatch($.clearUserData());
// 	dispatch(clearLocalLog());
// 	dispatch(clearLocalPrograms());
// 	dispatch(clearLocalProgramsList());
// 	dispatch(setCurrentStandardProgram());
// 	localStorage.clear();
// };

// // ----------------------- closeAccount ----------------------------

// // Remove all user data from db
// export const closeAccount = (formData) => (dispatch, getState) => {
// 	dispatch(clearError());
// 	const token = getTokenConfig(getState);
// 	dispatch(removeRemoteLog(token));
// 	dispatch(removeRemoteProgramsList(token));
// 	dispatch(removeAllRemotePrivatePrograms(token));
// 	axios
// 		.post("api/auth/delete", JSON.stringify(formData), token)
// 		.then(() => dispatch(logout()))
// 		.catch((err) => dispatch(getError(err, "CLOSE_ACCOUNT_FAIL")));
// };
