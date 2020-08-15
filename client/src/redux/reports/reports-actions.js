export const SET_REPORTS_LIST = "SET_REPORTS_LIST";
export const setReportsList = (data) => ({
	type: SET_REPORTS_LIST,
	payload: data,
});

export const ADD_REPORT_TO_LIST = "ADD_REPORT_TO_LIST";
export const addReportToList = (data) => ({
	type: ADD_REPORT_TO_LIST,
	payload: data,
});
