import * as $ from "./pets-actions";
import { makeState } from "utils/state";
import {
	makeArrayWithUnshiftedItems,
	makeArrayWithRemovedItems,
	makeSortedArray,
} from "utils/array";
import { byDateCreated_descending } from "utils/sort";
import {
	makeModifiedPet,
	makeStateWithModifiedPetReport,
	getPetById,
} from "./pets-utils";

const INITIAL_STATE = {
	updating: false,
	deleting: false,
	syncing: false,
	synced: false,
	list: [
		// {
		// 	id: "123412341234",
		// 	name: "Benny",
		// 	species: "canine",
		// 	sex: "male",
		// 	breed: "Dalmatian",
		// 	birthYear: 2010,
		// 	birthMonth: 7,
		// 	weight: 0,
		// 	microchip: 0,
		// 	imageUrl: Benny,
		// 	dateUpdated: undefined,
		//  syncing: false,
		//	synced: false,
		//  userId: '',
		//  owner: {}, // vet mode only
		// 	reports: [
		// 		{
		// 			id: "",
		// 			petId: "",
		// 			dateCreated: undefined,
		//			dateUpdated: undefined,
		//      dateSeen: undefined,
		// 			title: "",
		// 			problemList: [],
		// 			alert: 0,
		// 			sending: false,
		// 			sent: false,
		// 		},
		// 	],
		// },
	],
};

const reportsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.CLEAR: {
			return { ...INITIAL_STATE };
		}

		// ----------------------- List -------------------------

		// Overwrite
		case $.SET_LIST: {
			const pets = action.payload;
			return {
				...state,
				list: pets ? [...pets] : [],
			};
		}

		// Spread new props in each pet
		// Add missing pets; remove excess pets
		case $.MODIFY_LIST: {
			const newPets = action.payload;
			return {
				...state,
				list: newPets.map((pet) => {
					const oldPet = getPetById(pet.id, state.list);
					if (!oldPet) return pet;
					return { ...oldPet, ...pet };
				}),
			};
		}

		// ------------------------ Pet -------------------------

		case $.ADD_PET: {
			return makeState(state, "list", (list) =>
				makeArrayWithUnshiftedItems(list, action.payload)
			);
		}

		case $.MODIFY_PET: {
			const { id, formData } = action.payload;
			return makeModifiedPet(state, id, (pet) => ({ ...pet, ...formData }));
		}

		case $.DELETE_PET: {
			const { id } = action.payload;
			return makeState(state, "list", (list) =>
				makeArrayWithRemovedItems(list, null, (pet) => pet.id === id)
			);
		}

		// ---------------------- Reports -----------------------

		case $.SET_REPORTS: {
			const { id, data } = action.payload;
			return makeModifiedPet(state, id, (pet) =>
				makeState(pet, "reports", () => [...data])
			);
		}

		case $.SORT_REPORTS: {
			const { petId } = action.payload;
			return makeModifiedPet(state, petId, (pet) =>
				makeState(pet, "reports", (reports) =>
					makeSortedArray(reports, byDateCreated_descending)
				)
			);
		}

		case $.ADD_REPORT_TO_PET: {
			const { petId } = action.payload;
			return makeModifiedPet(state, petId, (pet) =>
				makeState(pet, "reports", (reports) =>
					makeArrayWithUnshiftedItems(reports, { ...action.payload })
				)
			);
		}

		case $.MODIFY_REPORT: {
			const { petId, id, data } = action.payload;
			return makeStateWithModifiedPetReport(state, id, petId, data);
		}

		// ------------ Sync status ------------

		// Sync pets

		case $.SYNC_START: {
			return {
				...state,
				syncing: true,
				synced: false,
			};
		}

		case $.SYNC_SUCCESS:
		case $.UP_TO_DATE: {
			return {
				...state,
				syncing: false,
				synced: true,
			};
		}

		case $.SYNC_FAIL: {
			return {
				...state,
				syncing: false,
				synced: false,
			};
		}

		// Add, update pet

		case $.ADD_START:
		case $.UPDATE_START:
			return {
				...state,
				updating: true,
			};

		case $.ADD_SUCCESS:
		case $.UPDATE_SUCCESS:
		case $.ADD_FAIL:
		case $.UPDATE_FAIL:
			return {
				...state,
				updating: false,
			};

		// Delete pet

		case $.DELETE_START:
			return {
				...state,
				deleting: true,
			};

		case $.DELETE_SUCCESS:
		case $.DELETE_FAIL:
			return {
				...state,
				deleting: false,
			};

		// Send report

		case $.SEND_REPORT_START: {
			const { id, petId } = action.payload;
			const data = { sending: true, sent: false };
			return makeStateWithModifiedPetReport(state, id, petId, data);
		}

		case $.SEND_REPORT_SUCCESS: {
			const { id, petId } = action.payload;
			const data = { sending: false, sent: true };
			return makeStateWithModifiedPetReport(state, id, petId, data);
		}

		case $.SEND_REPORT_FAIL: {
			const { id, petId } = action.payload;
			const data = { sending: false, sent: false };
			return makeStateWithModifiedPetReport(state, id, petId, data);
		}

		// Sync pet reports

		case $.SYNC_REPORTS_START: {
			const { petId } = action.payload;
			const update = { syncing: true, synced: false };
			return makeModifiedPet(state, petId, (pet) => ({ ...pet, ...update }));
		}

		case $.SYNC_REPORTS_SUCCESS:
		case $.REPORTS_UP_TO_DATE: {
			const { petId } = action.payload;
			const update = { syncing: false, synced: true };
			return makeModifiedPet(state, petId, (pet) => ({ ...pet, ...update }));
		}

		case $.SYNC_REPORTS_FAIL: {
			const { petId } = action.payload;
			const update = { syncing: false, synced: false };
			return makeModifiedPet(state, petId, (pet) => ({ ...pet, ...update }));
		}

		default:
			return state;
	}
};

export default reportsReducer;
