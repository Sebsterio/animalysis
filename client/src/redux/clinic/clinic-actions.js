// ---------------- Local state ---------------

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

// ---------------- Sync status ---------------

// Create

export const CREATE_START = "clinic/CREATE_START";
export const createStart = () => ({
	type: CREATE_START,
});
export const CREATE_SUCCESS = "clinic/CREATE_SUCCESS";
export const createSuccess = (data) => ({
	type: CREATE_SUCCESS,
	payload: data,
});
export const CREATE_FAIL = "clinic/CREATE_FAIL";
export const createFail = () => ({
	type: CREATE_FAIL,
});

// Update (POST)

export const UPDATE_START = "clinic/UPDATE_START";
export const updateStart = () => ({
	type: UPDATE_START,
});
export const UPDATE_SUCCESS = "clinic/UPDATE_SUCCESS";
export const updateSuccess = (data) => ({
	type: UPDATE_SUCCESS,
	payload: data,
});
export const UPDATE_FAIL = "clinic/UPDATE_FAIL";
export const updateFail = () => ({
	type: UPDATE_FAIL,
});

// Fetch

export const FETCH_START = "clinic/FETCH_START";
export const fetchStart = () => ({
	type: FETCH_START,
});
export const FETCH_SUCCESS = "clinic/FETCH_SUCCESS";
export const fetchSuccess = (data) => ({
	type: FETCH_SUCCESS,
	payload: data,
});
export const FETCH_FAIL = "clinic/FETCH_FAIL";
export const fetchFail = () => ({
	type: FETCH_FAIL,
});
export const UP_TO_DATE = "clinic/UP_TO_DATE";
export const upToDate = () => ({
	type: UP_TO_DATE,
});

// Delete

export const DELETE_START = "clinic/DELETE_START";
export const deleteStart = () => ({
	type: DELETE_START,
});
export const DELETE_SUCCESS = "clinic/DELETE_SUCCESS";
export const deleteSuccess = () => ({
	type: DELETE_SUCCESS,
});
export const DELETE_FAIL = "clinic/DELETE_FAIL";
export const deleteFail = () => ({
	type: DELETE_FAIL,
});
