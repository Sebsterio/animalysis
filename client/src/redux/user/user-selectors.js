export const getIsAuthenticated = (state) => state.user.isAuthenticated;

export const getName = (state) => state.user.name;

export const getUserClinic = (state) => state.user.clinic;

export const getIsClinicSet = (state) => !!getUserClinic(state).name;
