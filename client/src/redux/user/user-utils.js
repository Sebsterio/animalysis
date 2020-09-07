export const filterUserRes = (payload) => {
	const { email, token, type } = payload;
	const newState = {};
	if (email) newState.email = email;
	if (token) newState.token = token;
	if (type) newState.type = type;
	return newState;
};
