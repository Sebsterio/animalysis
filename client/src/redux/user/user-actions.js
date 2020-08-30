// Sync -- on app load

export const SYNC_START = "user/SYNC_START";
export const syncStart = () => ({
	type: SYNC_START,
});
export const SYNC_SUCCESS = "user/SYNC_SUCCESS";
export const syncSuccess = (data) => ({
	type: SYNC_SUCCESS,
	payload: data,
});
export const SYNC_FAIL = "user/SYNC_FAIL";
export const syncFail = (data) => ({
	type: SYNC_FAIL,
	payload: data,
});

// Sign in

export const SIGN_IN_START = "user/SIGN_IN_START";
export const signInStart = () => ({
	type: SIGN_IN_START,
});
export const SIGN_IN_SUCCESS = "user/SIGN_IN_SUCCESS";
export const signInSuccess = (data) => ({
	type: SIGN_IN_SUCCESS,
	payload: data,
});
export const SIGN_IN_FAIL = "user/SIGN_IN_FAIL";
export const signInFail = (data) => ({
	type: SIGN_IN_FAIL,
	payload: data,
});

// Sign up

export const SIGN_UP_START = "user/SIGN_UP_START";
export const signUpStart = () => ({
	type: SIGN_UP_START,
});
export const SIGN_UP_SUCCESS = "user/SIGN_UP_SUCCESS";
export const signUpSuccess = (data) => ({
	type: SIGN_UP_SUCCESS,
	payload: data,
});
export const SIGN_UP_FAIL = "user/SIGN_UP_FAIL";
export const signUpFail = (data) => ({
	type: SIGN_UP_FAIL,
	payload: data,
});

// Other

export const CLEAR_DATA = "user/CLEAR_DATA";
export const clearUser = () => ({
	type: CLEAR_DATA,
});
