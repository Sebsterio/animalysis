export const filterUserRes = (payload) => {
	const { email, token, type, demo, dateModified } = payload;
	const newState = {};
	if (email) newState.email = email;
	if (token) newState.token = token;
	if (type) newState.type = type;
	if (demo) newState.demo = demo;
	if (dateModified) newState.dateModified = dateModified;
	return newState;
};
