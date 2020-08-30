import { getToken } from "redux/user/user-selectors";

export const getConfig = () => ({
	headers: {
		"Content-Type": "application/json",
	},
});

export const getTokenConfig = (state) => {
	const config = getConfig();
	const token = getToken(state);
	if (token) config.headers["x-auth-token"] = token;
	return config;
};
