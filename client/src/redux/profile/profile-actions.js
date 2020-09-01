// ---------------- Local state ---------------

export const MODIFY = "profile/MODIFY";
export const modifyProfile = (data) => ({
	type: MODIFY,
	payload: data,
});

export const CLEAR = "profile/CLEAR";
export const clearProfile = () => ({
	type: CLEAR,
});

export const DISMISS_REMINDER = "profile/DISMISS_REMINDER";
export const dismissProfileReminder = () => ({
	type: DISMISS_REMINDER,
});

// ---------------- Sync status ---------------

// Create

export const CREATE_START = "profile/CREATE_START";
export const createProfileStart = () => ({
	type: CREATE_START,
});
export const CREATE_SUCCESS = "profile/CREATE_SUCCESS";
export const createProfileSuccess = (data) => ({
	type: CREATE_SUCCESS,
	payload: data,
});
export const CREATE_FAIL = "profile/CREATE_FAIL";
export const createProfileFail = () => ({
	type: CREATE_FAIL,
});
