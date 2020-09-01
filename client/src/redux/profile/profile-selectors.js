import { getHasReports } from "redux/pets/pets-selectors";

// -------------------- Info ---------------------

export const getProfile = (state) => state.profile;

// For ProfileForm
export const getData = (state) => {
	const { firstName, surname, phone } = getProfile(state);
	return { firstName, surname, phone };
};

export const getName = (state) => getProfile(state).firstName;

export const getPhone = (state) => getProfile(state).phone;

export const getHasPhone = (state) => !!getPhone(state);

export const getProfileReminderIsDismissed = (state) =>
	getProfile(state).reminderDismissed;

export const getShouldShowProfileReminder = (state) =>
	getHasReports(state) &&
	!getHasPhone(state) &&
	!getProfileReminderIsDismissed(state);

export const getDateUpdated = (state) => getProfile(state).dateUpdated;

export const getIsLoading = (state) => getProfile(state).isLoading;
