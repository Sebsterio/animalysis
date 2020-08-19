// ------------------ Pet --------------------

export const ADD_PET = "ADD_PET";
export const addPet = (data) => ({
	type: ADD_PET,
	payload: data,
});

export const MODIFY_PET = "MODIFY_PET";
export const modifyPet = (data) => ({
	type: MODIFY_PET,
	payload: data,
});

export const DELETE_PET = "DELETE_PET";
export const deletePet = (data) => ({
	type: DELETE_PET,
	payload: data,
});

// ---------------- Reports ------------------

export const SET_REPORTS = "SET_REPORTS";
export const setReports = (data) => ({
	type: SET_REPORTS,
	payload: data,
});

export const ADD_REPORT_TO_PET = "ADD_REPORT_TO_PET";
export const addReportToPet = (data) => ({
	type: ADD_REPORT_TO_PET,
	payload: data,
});
