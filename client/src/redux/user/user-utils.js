export const filterUserRes = (payload) => {
	const { email, token, type, dateModified } = payload;
	const newState = {};
	if (email) newState.email = email;
	if (token) newState.token = token;
	if (type) newState.type = type;
	if (dateModified) newState.dateModified = dateModified;
	return newState;
};
