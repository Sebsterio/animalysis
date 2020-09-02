// replaces state
export const SET = "clinic/SET";
export const setClinic = (data) => ({
	type: SET,
	payload: data,
});

// spreads old state
export const MODIFY = "clinic/MODIFY";
export const modifyClinic = (data) => ({
	type: MODIFY,
	payload: data,
});

export const CLEAR = "clinic/CLEAR";
export const clear = () => ({
	type: CLEAR,
});

export const DISMISS_REMINDER = "clinic/DISMISS_REMINDER";
export const dismissClinicReminder = () => ({
	type: DISMISS_REMINDER,
});
