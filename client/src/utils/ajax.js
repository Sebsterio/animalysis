export const getConfig = () => ({
	headers: {
		"Content-Type": "application/json",
	},
});

export const getTokenConfig = (getState) => {
	const config = getConfig();
	const token = getState().user.token;
	if (token) config.headers["x-auth-token"] = token;
	return config;
};
