// User
import { getIsAuthenticated } from "redux/user/user-selectors";
import * as userActions from "redux/user/user-actions";
import {
	syncUser,
	createUser,
	fetchUser,
	deleteUser,
} from "redux/user/user-operations";

// Profile
import * as profileActions from "redux/profile/profile-actions";
import { createProfile, deleteProfile } from "redux/profile/profile-operations";

// ---------------------------- syncData --------------------------------

// On app load, check all docs for updates
export const syncData = () => async (dispatch, getState) => {
	const signedIn = getIsAuthenticated(getState());
	if (!signedIn) return;

	await dispatch(syncUser());
	// sync profile etc.
};

// ---------------------------- signUp ----------------------------------

// Create new User and get token
// Then, create Profile
export const signUp = (formData) => async (dispatch) => {
	await dispatch(createUser(formData));
	const { firstName } = formData;
	dispatch(profileActions.modify({ firstName }));
	dispatch(createProfile({ firstName }));
};

// ------------------------ signIn ------------------------------

// Exchange password for token
// Then, fetch all data
export const signIn = (formData) => async (dispatch) => {
	await dispatch(fetchUser(formData));
	// fetch profile etc.
};

// -------------------------- closeAccount ------------------------------

// Delete all user-related docs; Restart app
export const closeAccount = (formData) => async (dispatch) => {
	await Promise.all([
		dispatch(deleteUser(formData)),
		dispatch(deleteProfile()),
	]);
	dispatch(signOut());
};

// ---------------------------- signOut ---------------------------------

// Clear store and persistor;
export const signOut = () => (dispatch) => {
	dispatch(userActions.clear());
	dispatch(profileActions.clear());
	localStorage.clear();
};
