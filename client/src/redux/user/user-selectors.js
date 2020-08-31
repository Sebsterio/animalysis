export const getUser = (state) => state.user;

export const getIsSignedIn = (state) => !!getUser(state).token;

export const getIsAuthenticated = (state) => getUser(state).isAuthenticated;

export const getIsLoading = (state) => getUser(state).isLoading;

export const getIsUpdating = (state) => getUser(state).isUpdating;

export const getDateModified = (state) => getUser(state).dateModified;

export const getToken = (state) => getUser(state).token;
