// -------------------- Auth ---------------------

export const getIsAuthenticated = (state) => state.user.isAuthenticated;

// -------------------- Info ---------------------

export const getUserInfo = (state) => state.user.info;

export const getName = (state) => getUserInfo(state).name;

export const getPhone = (state) => getUserInfo(state).phone;

export const getHasPhone = (state) => !!getPhone(state);

// -------------------- Clinic ---------------------

export const getUserClinic = (state) => state.user.clinic;

export const getIsClinicSet = (state) => !!getUserClinic(state).name;

export const getClinicReminderIsDismissed = (state) =>
	state.user.reminderDismissed;

export const getShouldShowClinicReminder = (state) =>
	!getIsClinicSet(state) && !getClinicReminderIsDismissed(state);
