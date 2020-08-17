import * as $ from "./pets-actions";
import { makeState } from "utils/state";
import { makeArrayWithPushedItems } from "utils/array";
import { makeModifiedPet } from "./pets-utils";

// temp
import dogImage from "assets/dog.jpg";

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
			imageUrl: dogImage, // TODO
			reports: [],
		},
	],
};

// const reportSchema = {
//  id: '',
//  petId: ''
//  date: null,
//  title: '',
// 	problemList: [],
// 	alert: 0,
// 	dateSynced: null, // syncs on ReportPage mount
//  syncing: false
// };

const reportsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// ---------------------- Pet Reports -----------------------

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
