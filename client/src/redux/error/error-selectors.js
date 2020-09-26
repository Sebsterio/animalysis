export const getError = (state) => state.error;

export const getTarget = (state) => getError(state).target;

export const getIsError = (state) => !!getTarget(state);

export const getIsEmailError = (state) => getTarget(state) === "email";

export const getIsNewEmailError = (state) => getTarget(state) === "newEmail";

export const getIsPasswordError = (state) => getTarget(state) === "password";

export const getIsCodeError = (state) => getTarget(state) === "code";

export const getIsGenericError = (state) => getTarget(state) === "generic";

export const getErrorMessage = (state) => getError(state).msg;
