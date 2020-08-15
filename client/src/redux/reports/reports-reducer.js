import * as $ from "./reports-actions";
import { makeState } from "utils/state";
import { makeArrayWithPushedItems } from "utils/array";

const INITIAL_STATE = {
	activeIndex: 0, // index of currently active report
	list: [], // report objects
};

// const reportSchema = {
// 	problemList: [],
// 	alert: 0,
// 	dateSynced: null, // syncs on ReportPage mount
// };

const reportsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case $.SET_REPORTS_LIST: {
			return makeState(state, "list", () => [...action.payload]);
		}

		case $.ADD_REPORT_TO_LIST: {
			return makeState(state, "list", (list) =>
				makeArrayWithPushedItems(list, {
					...action.payload,
					dateSynced: null,
				})
			);
		}

		default:
			return state;
	}
};

export default reportsReducer;
