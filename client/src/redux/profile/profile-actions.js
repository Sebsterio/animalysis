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
export const createStart = () => ({
	type: CREATE_START,
});
export const CREATE_SUCCESS = "profile/CREATE_SUCCESS";
export const createSuccess = (data) => ({
	type: CREATE_SUCCESS,
	payload: data,
});
export const CREATE_FAIL = "profile/CREATE_FAIL";
export const createFail = () => ({
	type: CREATE_FAIL,
});

// Delete

export const DELETE_START = "profile/DELETE_START";
export const deleteStart = () => ({
	type: DELETE_START,
});
export const DELETE_SUCCESS = "profile/DELETE_SUCCESS";
export const deleteSuccess = () => ({
	type: DELETE_SUCCESS,
});
export const DELETE_FAIL = "profile/DELETE_FAIL";
export const deleteFail = () => ({
	type: DELETE_FAIL,
});
