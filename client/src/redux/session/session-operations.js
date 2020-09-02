// User
import { getIsAuthenticated, getIsVet } from "redux/user/user-selectors";
import * as userActions from "redux/user/user-actions";
import {
	syncUser,
	createUser,
	fetchUser,
	deleteUser,
} from "redux/user/user-operations";

// Profile
import * as profileActions from "redux/profile/profile-actions";
import {
	createProfile,
	fetchProfile,
	deleteProfile,
} from "redux/profile/profile-operations";

// Survey
// import * as surveyDataActions from "redux/survey-data/survey-data-actions";
import { fetchSurvey } from "redux/survey-data/survey-data-operations";

/*********************************************
 *
 * Coordinates operations across other stores
 *
 *********************************************/

// ---------------------------- syncData --------------------------------

// On app load, check all docs for updates
export const syncData = () => async (dispatch, getState) => {
	const signedIn = getIsAuthenticated(getState());
	if (!signedIn) return;

	await dispatch(syncUser());
	const isVet = getIsVet(getState()); // get updated state
	dispatch(fetchProfile(isVet));
	dispatch(fetchSurvey());
};

// ---------------------------- signUp ----------------------------------

// Create new User and get token
// Then, create Profile
export const signUp = (formData) => async (dispatch) => {
	await dispatch(createUser(formData));
	const { firstName } = formData;
	if (firstName) dispatch(profileActions.modify({ firstName }));
	dispatch(createProfile({ firstName }));
};

// ---------------------------- signIn ----------------------------------

// Exchange password for token
// Then, fetch all data
export const signIn = (formData) => async (dispatch, getState) => {
	await dispatch(fetchUser(formData));
	const isVet = getIsVet(getState()); // get updated state
	dispatch(fetchProfile(isVet));
	dispatch(fetchSurvey());
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
	// Dont'clear surveyData (?)
};
