import { ensurePadding } from "utils/string";

export const getDateString = (date) => {
	const dateObj = new Date(date);
	const day = ensurePadding(String(dateObj.getDate()), 2);
	const month = ensurePadding(String(dateObj.getMonth()), 2);
	const year = dateObj.getFullYear();
	return `${day}-${month}-${year}`;
};

export const getAge = (month, year) => {
	const dateNow = new Date();
	const monthDiff = dateNow.getMonth() + 1 - month;
	return dateNow.getFullYear() - year - (monthDiff < 0 ? 1 : 0);
};

export const getCurrentYear = () => new Date().getFullYear();
