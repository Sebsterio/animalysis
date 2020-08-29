export const MODIFY_CLINIC = "clinic/MODIFY_CLINIC";
export const modifyClinic = (data) => ({
	type: MODIFY_CLINIC,
	payload: data,
});

export const DISMISS_REMINDER = "clinic/DISMISS_REMINDER";
export const dismissClinicReminder = () => ({
	type: DISMISS_REMINDER,
});
