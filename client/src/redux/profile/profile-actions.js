export const MODIFY_PROFILE = "profile/MODIFY_PROFILE";
export const modifyProfile = (data) => ({
	type: MODIFY_PROFILE,
	payload: data,
});

export const DISMISS_REMINDER = "profile/DISMISS_REMINDER";
export const dismissProfileReminder = () => ({
	type: DISMISS_REMINDER,
});
