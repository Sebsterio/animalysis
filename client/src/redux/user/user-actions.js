export const SING_IN = "SING_IN";
export const signIn = (data) => ({
	type: SING_IN,
	payload: data,
});

export const MODIFY_USER_CLINIC = "MODIFY_USER_CLINIC";
export const modifyUserClinic = (data) => ({
	type: MODIFY_USER_CLINIC,
	payload: data,
});
