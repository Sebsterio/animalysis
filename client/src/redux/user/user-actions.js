export const SING_IN = "SING_IN";
export const signIn = (data) => ({
	type: SING_IN,
	payload: data,
});

export const MODIFY_USER_INFO = "MODIFY_USER_INFO";
export const modifyUserInfo = (data) => ({
	type: MODIFY_USER_INFO,
	payload: data,
});

export const DISMISS_USER_REMINDER = "DISMISS_USER_REMINDER";
export const dismissUserReminder = () => ({
	type: DISMISS_USER_REMINDER,
});

export const MODIFY_USER_CLINIC = "MODIFY_USER_CLINIC";
export const modifyUserClinic = (data) => ({
	type: MODIFY_USER_CLINIC,
	payload: data,
});

export const DISMISS_CLINIC_REMINDER = "DISMISS_CLINIC_REMINDER";
export const dismissClinicReminder = () => ({
	type: DISMISS_CLINIC_REMINDER,
});
