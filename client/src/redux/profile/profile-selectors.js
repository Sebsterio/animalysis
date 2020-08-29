import { getHasReports } from "redux/pets/pets-selectors";

// -------------------- Info ---------------------

export const getProfile = (state) => state.profile;

export const getName = (state) => getProfile(state).name;

export const getPhone = (state) => getProfile(state).phone;

export const getHasPhone = (state) => !!getPhone(state);

export const getUserReminderIsDismissed = (state) =>
	getProfile(state).reminderDismissed;

export const getShouldShowProfileReminder = (state) =>
	getHasReports(state) &&
	!getHasPhone(state) &&
	!getUserReminderIsDismissed(state);
