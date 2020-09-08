export const CLEAR = "pets/CLEAR";
export const clear = () => ({
	type: CLEAR,
});

// ------------------ Pet --------------------

export const ADD_PET = "pets/ADD_PET";
export const addPet = (data) => ({
	type: ADD_PET,
	payload: data,
});

export const MODIFY_PET = "pets/MODIFY_PET";
export const modifyPet = (data) => ({
	type: MODIFY_PET,
	payload: data,
});

export const DELETE_PET = "pets/DELETE_PET";
export const deletePet = (data) => ({
	type: DELETE_PET,
	payload: data,
});

// ---------------- Reports ------------------

export const SET_REPORTS = "pets/SET_REPORTS";
export const setReports = (data) => ({
	type: SET_REPORTS,
	payload: data,
});

export const ADD_REPORT_TO_PET = "pets/ADD_REPORT_TO_PET";
export const addReportToPet = (data) => ({
	type: ADD_REPORT_TO_PET,
	payload: data,
});

// ---------------- Sync status ---------------

// Add

export const ADD_START = "pets/ADD_START";
export const addStart = () => ({
	type: ADD_START,
});
export const ADD_SUCCESS = "pets/ADD_SUCCESS";
export const addSuccess = () => ({
	type: ADD_SUCCESS,
});
export const ADD_FAIL = "pets/ADD_FAIL";
export const addFail = () => ({
	type: ADD_FAIL,
});

// Update (POST)

export const UPDATE_START = "pets/UPDATE_START";
export const updateStart = () => ({
	type: UPDATE_START,
});
export const UPDATE_SUCCESS = "pets/UPDATE_SUCCESS";
export const updateSuccess = () => ({
	type: UPDATE_SUCCESS,
});
export const UPDATE_FAIL = "pets/UPDATE_FAIL";
export const updateFail = () => ({
	type: UPDATE_FAIL,
});

// Delete

export const DELETE_START = "pets/DELETE_START";
export const deleteStart = () => ({
	type: DELETE_START,
});
export const DELETE_SUCCESS = "pets/DELETE_SUCCESS";
export const deleteSuccess = () => ({
	type: DELETE_SUCCESS,
});
export const DELETE_FAIL = "pets/DELETE_FAIL";
export const deleteFail = () => ({
	type: DELETE_FAIL,
});
