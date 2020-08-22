export const getIsAuthenticated = (state) => state.user.isAuthenticated;

export const getName = (state) => state.user.name;

export const getUserClinic = (state) => state.user.clinic;

export const getIsClinicSet = (state) => !!getUserClinic(state).name;

export const getClinicReminderIsDismissed = (state) =>
	state.user.clinicReminderDismissed;

export const getShouldShowClinicReminder = (state) =>
	!getIsClinicSet(state) && !getClinicReminderIsDismissed(state);
