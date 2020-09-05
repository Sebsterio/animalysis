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
