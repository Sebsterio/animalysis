export const getAllPets = (state) => state.pets.list;

export const getIsPetsListEmpty = (state) => !getAllPets(state).length;

export const getIsSyncing = (state) => state.pets.syncing;

export const getIsUpdating = (state) => state.pets.updating;

export const getIsDeleting = (state) => state.pets.deleting;

export const getAreAnyPetsSyncing = (state) =>
	getAllPets(state).some((pet) => pet.syncing);

// ------------ single pet --------------

export const getPetById = (state, id) =>
	getAllPets(state).find((pet) => pet.id === id);

export const getPetByName = (state, name) =>
	getAllPets(state).find(
		(pet) => pet.name.toLowerCase() === name.toLowerCase()
	);

export const getPetsByUserId = (state, userId) =>
	getAllPets(state).filter((pet) => pet.userId === userId);

export const getFirstPet = (state) => getAllPets(state)[0];

export const getPetReports = (pet) => pet.reports || [];

export const isNameUnique = (state, name) =>
	!getAllPets(state).some((pet) => pet.name === name);

// -------------- reports ----------------

export const getAllPetReports = (state) =>
	getAllPets(state).reduce(
		(acc, pet) => (pet.reports ? [...acc, ...pet.reports] : acc),
		[]
	);

export const getAllReportsAugmented = (state) =>
	getAllPets(state).reduce((acc, pet) => {
		if (!pet.reports) return acc;
		const { firstName, surname } = pet.owner;
		const ownerName = firstName + (surname ? ` ${surname}` : "");
		const augmentedReports = pet.reports.map((report) => {
			return { ...pet, ...report, ownerName };
		});
		return [...acc, ...augmentedReports];
	}, []);

export const getAllUnseenReports = (state) =>
	getAllPetReports(state).filter((report) => !report.dateSeen);

// TODO: filter dateSeen first
export const getAugmentedUnseenReports = (state) =>
	getAllReportsAugmented(state).filter((report) => !report.dateSeen);

export const getHasReports = (state) => !!getAllPetReports(state).length;

export const getReportById = (state, id) => {
	const list = getAllPetReports(state);
	return list.find((report) => report.id === id);
};
