export const authModes = {
	signIn: "sign-in",
	signUp: "sign-up",
};

export const mainModes = {
	email: "email",
	password: "password",
	type: "type",
	close: "close",
};

export const modes = {
	...mainModes,
	...authModes,
};

export const subroutes = {
	account: "/account",
	singIn: "/account/" + authModes.signIn,
	email: "/account/" + mainModes.email,
	password: "/account/" + mainModes.password,
	type: "/account/" + mainModes.type,
	close: "/account/" + mainModes.close,
};
