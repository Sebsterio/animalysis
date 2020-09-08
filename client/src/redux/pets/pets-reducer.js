import * as $ from "./pets-actions";
import { makeState } from "utils/state";
import {
	makeArrayWithPushedItems,
	makeArrayWithRemovedItems,
} from "utils/array";
import { makeModifiedPet, makeStateWithModifiedPetReport } from "./pets-utils";

const INITIAL_STATE = {
	updating: false,
	deleting: false, // unused
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
		//	dateUpdated: null,
		// 	reports: [
		// 		// {
		// 		//  id: '',
		// 		//  petId: ''
		// 		//  dateCreated: null,
		// 		//  title: '',
		// 		// 	problemList: [],
		// 		// 	alert: 0,
		// 		//  syncing: false
		//		//	sent: false
		// 		// };
		// 	],
		// },
	],
};

const reportsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SET_LIST: {
			return {
				...state,
				list: [...action.payload],
			};
		}

		case $.CLEAR: {
			return { ...INITIAL_STATE };
		}

		// ------------------------ Pet -------------------------

		case $.ADD_PET: {
			return makeState(state, "list", (list) =>
				makeArrayWithPushedItems(list, action.payload)
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

		case $.ADD_REPORT_TO_PET: {
			const { petId } = action.payload;
			return makeModifiedPet(state, petId, (pet) =>
				makeState(pet, "reports", (reports) =>
					makeArrayWithPushedItems(reports, { ...action.payload })
				)
			);
		}

		case $.MODIFY_REPORT: {
			const { id, petId, data } = action.payload;
			return makeStateWithModifiedPetReport(state, id, petId, data);
		}

		// ------------ Sync status ------------

		// Add, Update

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

		// Delete

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
			const data = { sending: true };
			return makeStateWithModifiedPetReport(state, id, petId, data);
		}

		case $.SEND_REPORT_SUCCESS:
		case $.SEND_REPORT_FAIL: {
			const { id, petId } = action.payload;
			const data = { sending: false, sent: true };
			return makeStateWithModifiedPetReport(state, id, petId, data);
		}

		default:
			return state;
	}
};

export default reportsReducer;
