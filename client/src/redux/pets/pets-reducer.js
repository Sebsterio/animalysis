import * as $ from "./pets-actions";
import { makeState } from "utils/state";
import {
	makeArrayWithPushedItems,
	makeArrayWithRemovedItems,
} from "utils/array";
import { makeModifiedPet } from "./pets-utils";
import shortid from "shortid";

// import Benny from "assets/benny.jpg";

const INITIAL_STATE = {
	dateSynced: null,
	list: [
		{
			id: "123412341234",
			name: "Benny",
			species: "canine",
			sex: "male",
			breed: "Dalmatian",
			birthYear: 2010,
			birthMonth: 7,
			weight: 0,
			microchip: 0,
			// imageUrl: Benny,
			reports: [
				// {
				//  id: '',
				//  petId: ''
				//  date: null,
				//  title: '',
				// 	problemList: [],
				// 	alert: 0,
				// 	dateSynced: null, // syncs on ReportPage mount
				//  syncing: false
				// };
			],
		},
	],
};

const reportsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ------------------------ Pet -------------------------

		case $.ADD_PET: {
			const newPet = {
				...action.payload,
				id: shortid.generate(),
				reports: [],
			};
			return makeState(state, "list", (list) =>
				makeArrayWithPushedItems(list, newPet)
			);
		}

		case $.MODIFY_PET: {
			const { id, data } = action.payload;
			return makeModifiedPet(state, id, (pet) => ({ ...pet, ...data }));
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

		default:
			return state;
	}
};

export default reportsReducer;
