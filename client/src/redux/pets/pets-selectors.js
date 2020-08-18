export const getAllPets = (state) => state.pets.list;

// ------------ single pet --------------

export const getPetById = (state, id) =>
	getAllPets(state).find((pet) => pet.id === id);

export const getPetByName = (state, name) =>
	getAllPets(state).find(
		(pet) => pet.name.toLowerCase() === name.toLowerCase()
	);

export const getPetReports = (pet) => pet.reports || [];

export const isNameUnique = (state, name) =>
	!getAllPets(state).some((pet) => pet.name === name);

// -------------- reports ----------------

export const getAllPetReports = (state) =>
	getAllPets(state).reduce((acc, pet) => [...acc, ...pet.reports], []);

export const getReportById = (state, id) => {
	const list = getAllPetReports(state);
	return list.find((report) => report.id === id);
};
