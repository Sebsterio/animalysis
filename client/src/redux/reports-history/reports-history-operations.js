import * as $ from "./reports-history-actions";
import { getAllReportsAugmented } from "redux/pets/pets-selectors";
import { getDateString } from "utils/date";

export const initTable = () => (dispatch, getState) => {
	const reports = getAllReportsAugmented(getState());
	dispatch($.setRows(reports));
};

// Filter rows by search query (match any field) and "seen" status
// prettier-ignore
export const sortRows = ({query, seenHidden, searchableFields}) => (dispatch, getState) => {
	const reports = getAllReportsAugmented(getState());
	let newRows = [...reports]
	if (seenHidden)	newRows = newRows.filter((row) => !row.dateSeen)
	if (query !== '')	newRows = newRows.filter((row) =>
		searchableFields.some((field) => {
			const fieldString =	field === "dateCreated"
				? getDateString(row[field])
				: String(row[field]).toLowerCase();
			return fieldString.includes(query.toLowerCase());
		}))
	dispatch($.setRows(newRows));
	dispatch($.setPage(0));
}
