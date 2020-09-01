// ---------------- Local state ---------------

export const MODIFY = "profile/MODIFY";
export const modify = (data) => ({
	type: MODIFY,
	payload: data,
});

export const CLEAR = "profile/CLEAR";
export const clear = () => ({
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

// Update (POST)

export const UPDATE_START = "profile/UPDATE_START";
export const updateStart = () => ({
	type: UPDATE_START,
});
export const UPDATE_SUCCESS = "profile/UPDATE_SUCCESS";
export const updateSuccess = (data) => ({
	type: UPDATE_SUCCESS,
	payload: data,
});
export const UPDATE_FAIL = "profile/UPDATE_FAIL";
export const updateFail = () => ({
	type: UPDATE_FAIL,
});

// Fetch

export const FETCH_START = "profile/FETCH_START";
export const fetchStart = () => ({
	type: FETCH_START,
});
export const FETCH_SUCCESS = "profile/FETCH_SUCCESS";
export const fetchSuccess = (data) => ({
	type: FETCH_SUCCESS,
	payload: data,
});
export const FETCH_FAIL = "profile/FETCH_FAIL";
export const fetchFail = () => ({
	type: FETCH_FAIL,
});
export const UP_TO_DATE = "profile/UP_TO_DATE";
export const upToDate = () => ({
	type: UP_TO_DATE,
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
