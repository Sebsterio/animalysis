import * as $ from "./pets-actions";
import { makeState } from "utils/state";
import {
	makeArrayWithPushedItems,
	makeArrayWithRemovedItems,
} from "utils/array";
import { makeModifiedPet } from "./pets-utils";

const INITIAL_STATE = {
	updating: false,
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
		// 		//  date: null,
		// 		//  title: '',
		// 		// 	problemList: [],
		// 		// 	alert: 0,
		// 		// 	dateSynced: null, // syncs on ReportPage mount
		// 		//  syncing: false
		// 		// };
		// 	],
		// },
	],
};

const reportsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.CLEAR: {
			return { ...INITIAL_STATE };
		}

		// ------------------------ Pet -------------------------

		case $.ADD_PET: {
			const newPet = {
				...action.payload, // id comes from db
				// id: shortid.generate(),
				reports: [],
			};
			return makeState(state, "list", (list) =>
				makeArrayWithPushedItems(list, newPet)
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
					makeArrayWithPushedItems(reports, {
						...action.payload,
						syncing: false,
						dateSynced: null,
					})
				)
			);
		}

		// ------------ Sync status ------------

		case $.ADD_START:
		case $.UPDATE_START:
		case $.DELETE_START:
			return {
				...state,
				updating: true,
			};

		case $.ADD_SUCCESS:
		case $.UPDATE_SUCCESS:
		case $.DELETE_SUCCESS:
		case $.ADD_FAIL:
		case $.UPDATE_FAIL:
		case $.DELETE_FAIL:
			return {
				...state,
				updating: false,
			};

		default:
			return state;
	}
};

export default reportsReducer;
