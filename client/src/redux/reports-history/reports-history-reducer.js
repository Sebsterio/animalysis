import * as $ from "./reports-history-actions";

const INITIAL_STATE = {
	rows: [], // reports data
	order: "desc", // sort
	orderBy: "dateCreated", // sort
	selected: [], // IDs of rows selected
	page: 0, // pagination
	rowsPerPage: 10, // pagination
	query: "", // serach & filtering
	seenHidden: false, // serach & filtering
};

const reportsHistoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// Data
		case $.SET_ROWS: {
			return { ...state, rows: [...action.payload] };
		}

		// Order
		case $.SET_ORDER: {
			return { ...state, order: action.payload };
		}
		case $.SET_ORDER_BY: {
			return { ...state, orderBy: action.payload };
		}

		// Selection
		case $.SET_SELECTED: {
			return { ...state, selected: [...action.payload] };
		}

		// Pagination
		case $.SET_PAGE: {
			return { ...state, page: action.payload };
		}
		case $.SET_ROWS_PER_PAGE: {
			return { ...state, rowsPerPage: action.payload };
		}

		// Search & filtering
		case $.SET_QUERY: {
			return { ...state, query: action.payload };
		}
		case $.TOGGLE_SEEN_HIDDEN: {
			return { ...state, seenHidden: !state.seenHidden };
		}

		// General
		case $.CLEAR: {
			return { ...INITIAL_STATE };
		}

		default:
			return state;
	}
};

export default reportsHistoryReducer;
