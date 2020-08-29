export const getClinic = (state) => state.clinic;

export const getIsClinicSet = (state) => !!getClinic(state).name;

export const getClinicReminderIsDismissed = (state) =>
	getClinic(state).reminderDismissed;

export const getShouldShowClinicReminder = (state) =>
	!getIsClinicSet(state) && !getClinicReminderIsDismissed(state);
