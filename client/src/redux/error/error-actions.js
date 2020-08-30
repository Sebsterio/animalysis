export const SET_ERROR = "error/SET_ERROR";
export const setError = (actionData) => {
	const { response, message } = actionData;
	const { data, status, statusText } = response || {};
	const { note, msg, id } = data || {};
	return {
		type: SET_ERROR,
		// Native Error props
		status,
		statusText,
		message,
		// Custom props
		note,
		msg,
		id,
		// Entire Error object for quick inspection
		error: actionData,
	};
};

export const CLEAR_ERROR = "error/CLEAR_ERROR";
export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};
