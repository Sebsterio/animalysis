export const getUser = (state) => state.user;

export const getIsAuthenticated = (state) => !!getUser(state).token;

export const getIsLoading = (state) => getUser(state).isLoading;

export const getIsUpdating = (state) => getUser(state).isUpdating;

export const getDateModified = (state) => getUser(state).dateModified;

export const getToken = (state) => getUser(state).token;

export const getType = (state) => getUser(state).type;

export const getIsVet = (state) => {
	const type = getType(state);
	return type === "vet" || type === "superuser";
};

export const getIsSuperuser = (state) => getType(state) === "superuser";

export const getEmail = (state) => getUser(state).email;
