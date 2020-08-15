import { ensurePadding } from "utils/string";

export const getDateString = (date) => {
	const dateObj = new Date(date);
	const day = ensurePadding(String(dateObj.getDate()), 2);
	const month = ensurePadding(String(dateObj.getMonth()), 2);
	const year = dateObj.getFullYear();
	return `${day}-${month}-${year}`;
};
