export const AUTH_START = "user/AUTH_START";
export const authStart = () => ({
	type: AUTH_START,
});
export const AUTH_SUCCESS = "user/AUTH_SUCCESS";
export const authSuccess = (data) => ({
	type: AUTH_SUCCESS,
	payload: data,
});
export const AUTH_FAIL = "user/AUTH_FAIL";
export const authFail = (err) => ({
	type: AUTH_FAIL,
	err,
});
export const CLEAR_DATA = "user/CLEAR_DATA";
export const clearUser = () => ({
	type: CLEAR_DATA,
});
