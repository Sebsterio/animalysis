export const authModes = {
	signIn: "sign-in",
	signUp: "sign-up",
};

export const mainModes = {
	edit: "edit",
	close: "close",
};

export const modes = {
	...mainModes,
	...authModes,
};

export const subroutes = {
	account: "/account",
	singIn: "/account/" + authModes.signIn,
	close: "/account/" + mainModes.close,
	edit: "/account/" + mainModes.edit,
};
