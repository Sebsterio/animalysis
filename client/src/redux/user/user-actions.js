// ---------------- Local state ---------------

export const MODIFY = "user/MODIFY";
export const modify = (data) => ({
	type: MODIFY,
	payload: data,
});

export const CLEAR = "user/CLEAR";
export const clear = () => ({
	type: CLEAR,
});

// ---------------- Sync status ---------------

// Create

export const CREATE_START = "user/CREATE_START";
export const createStart = () => ({
	type: CREATE_START,
});
export const CREATE_SUCCESS = "user/CREATE_SUCCESS";
export const createSuccess = (data) => ({
	type: CREATE_SUCCESS,
	payload: data,
});
export const CREATE_FAIL = "user/CREATE_FAIL";
export const createFail = () => ({
	type: CREATE_FAIL,
});

// Fetch

export const FETCH_START = "user/FETCH_START";
export const fetchStart = () => ({
	type: FETCH_START,
});
export const FETCH_SUCCESS = "user/FETCH_SUCCESS";
export const fetchSuccess = (data) => ({
	type: FETCH_SUCCESS,
	payload: data,
});
export const FETCH_FAIL = "user/FETCH_FAIL";
export const fetchFail = () => ({
	type: FETCH_FAIL,
});

// Sync -- on app load

export const SYNC_START = "user/SYNC_START";
export const syncStart = () => ({
	type: SYNC_START,
});
export const SYNC_SUCCESS = "user/SYNC_SUCCESS";
export const syncSuccess = (data) => ({
	type: SYNC_SUCCESS,
	payload: data,
});
export const SYNC_FAIL = "user/SYNC_FAIL";
export const syncFail = () => ({
	type: SYNC_FAIL,
});
export const SYNC_CANCELED = "user/SYNC_CANCELED";
export const syncCanceled = () => ({
	type: SYNC_CANCELED,
});
export const UP_TO_DATE = "user/UP_TO_DATE";
export const upToDate = () => ({
	type: UP_TO_DATE,
});

// Update (POST)

export const UPDATE_START = "user/UPDATE_START";
export const updateStart = () => ({
	type: UPDATE_START,
});
export const UPDATE_SUCCESS = "user/UPDATE_SUCCESS";
export const updateSuccess = (data) => ({
	type: UPDATE_SUCCESS,
	payload: data,
});
export const UPDATE_FAIL = "user/UPDATE_FAIL";
export const updateFail = () => ({
	type: UPDATE_FAIL,
});

// Delete

export const DELETE_START = "user/DELETE_START";
export const deleteStart = () => ({
	type: DELETE_START,
});
export const DELETE_SUCCESS = "user/DELETE_SUCCESS";
export const deleteSuccess = () => ({
	type: DELETE_SUCCESS,
});
export const DELETE_FAIL = "user/DELETE_FAIL";
export const deleteFail = () => ({
	type: DELETE_FAIL,
});
