export const SET_ERROR = "error/SET_ERROR";
export const setError = (actionData) => {
	const { response, message } = actionData;
	const { data, status, statusText } = response || {};
	const { msg, target } = data || {};

	return {
		type: SET_ERROR,
		// for UI feedback
		payload: {
			msg: msg || data || message,
			target,
		},
		// For quick inspection
		status,
		statusText,
		error: actionData,
	};
};

export const CLEAR_ERROR = "error/CLEAR_ERROR";
export const clearError = (note) => {
	return { type: CLEAR_ERROR, note };
};
