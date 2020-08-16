import * as $ from "./pets-actions";
import { makeState } from "utils/state";
import { makeArrayWithPushedItems } from "utils/array";
import { makeModifiedPet } from "./pets-utils";

const INITIAL_STATE = {
	dateSynced: null,
	list: [
		{
			id: "123412341234",
			name: "Benny",
			dateOfBirth: [7, 2010],
			sex: "male",
			species: "canine",
			breed: "Dalmatian",
			reports: [],
		},
	],
};

// const reportSchema = {
// 	problemList: [],
// 	alert: 0,
// 	dateSynced: null, // syncs on ReportPage mount
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
			const { id, data } = action.payload; // petId
			return makeModifiedPet(state, id, (pet) =>
				makeState(pet, "reports", (reports) =>
					makeArrayWithPushedItems(reports, {
						...data,
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
