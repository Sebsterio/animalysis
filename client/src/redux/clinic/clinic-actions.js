export const MODIFY = "clinic/MODIFY";
export const modifyClinic = (data) => ({
	type: MODIFY,
	payload: data,
});

export const CLEAR = "clinic/CLEAR";
export const clear = (data) => ({
	type: CLEAR,
	payload: data,
});

export const DISMISS_REMINDER = "clinic/DISMISS_REMINDER";
export const dismissClinicReminder = () => ({
	type: DISMISS_REMINDER,
});
