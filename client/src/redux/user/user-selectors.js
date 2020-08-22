import { getHasReports } from "redux/pets/pets-selectors";

// -------------------- Auth ---------------------

export const getIsAuthenticated = (state) => state.user.isAuthenticated;

// -------------------- Info ---------------------

export const getUserInfo = (state) => state.user.info;

export const getName = (state) => getUserInfo(state).name;

export const getPhone = (state) => getUserInfo(state).phone;

export const getHasPhone = (state) => !!getPhone(state);

export const getUserReminderIsDismissed = (state) =>
	getUserInfo(state).reminderDismissed;

export const getShouldShowUserReminder = (state) =>
	getHasReports(state) &&
	!getHasPhone(state) &&
	!getUserReminderIsDismissed(state);

// -------------------- Clinic ---------------------

export const getUserClinic = (state) => state.user.clinic;

export const getIsClinicSet = (state) => !!getUserClinic(state).name;

export const getClinicReminderIsDismissed = (state) =>
	getUserClinic(state).reminderDismissed;

export const getShouldShowClinicReminder = (state) =>
	!getIsClinicSet(state) && !getClinicReminderIsDismissed(state);
