export const getClinic = (state) => state.clinic;

export const getIsClinicSet = (state) => !!getClinic(state).name;

export const getClinicReminderIsDismissed = (state) =>
	getClinic(state).reminderDismissed;

export const getShouldShowClinicReminder = (state) =>
	!getIsClinicSet(state) && !getClinicReminderIsDismissed(state);

// For ClinicForm
export const getFormData = (state) => {
	const { name, address, email, phone, phone2 } = getClinic(state);
	return { name, address, email, phone, phone2 };
};
// For VetClinicForm
export const getVetFormData = (state) => {
	const { name, address, email, phone, phone2, members } = getClinic(state);
	return { name, address, email, phone, phone2, members };
};

export const getIsRegistered = (state) => !!getClinic(state).id;

export const getIsUpdating = (state) => getClinic(state).isUpdating;

export const getDateModified = (state) => getClinic(state).dateModified;

export const getClinicId = (state) => getClinic(state).id;
