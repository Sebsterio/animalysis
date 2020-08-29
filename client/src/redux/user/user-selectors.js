export const getUser = (state) => state.user;

export const getIsAuthenticated = (state) => getUser(state).isAuthenticated;

export const getIsLoading = (state) => getUser(state).isLoading;
