export const authModes = {
	signIn: "sign-in",
	signUp: "sign-up",
	forgotPw: "forgot-password",
	resetPw: "reset-password",
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
	signIn: "/account/" + authModes.signIn,
	resetPw: "/account/" + authModes.resetPw,
	email: "/account/" + mainModes.email,
	password: "/account/" + mainModes.password,
	type: "/account/" + mainModes.type,
	close: "/account/" + mainModes.close,
};

export const inputNames = [
	"email",
	"password",
	"code",
	"newEmail",
	"newPassword",
	"firstName",
	"type",
];
