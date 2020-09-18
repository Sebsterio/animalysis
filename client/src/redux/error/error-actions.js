export const SET_ERROR = "error/SET_ERROR";
export const setError = (actionData) => {
	let { response, message, msg, target } = actionData;
	const { data, status, statusText } = response || {};
	// let { msg, target } = data || {};
	if (!msg && !!data) ({ msg } = data);
	if (!target && !!data) ({ target } = data);

	if (status === 503 && !target) {
		target = "generic";
		msg = "Error contacting the server. Please try again later.";
	}
	if (message === "Network Error") {
		target = "generic";
		msg = "You're not connected to the internet.";
	}

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
