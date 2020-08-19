import { ensurePadding } from "utils/string";

export const getDateString = (date) => {
	const dateObj = new Date(date);
	const day = ensurePadding(String(dateObj.getDate()), 2);
	const month = ensurePadding(String(dateObj.getMonth()), 2);
	const year = dateObj.getFullYear();
	return `${day}-${month}-${year}`;
};

export const getCurrentYear = () => new Date().getFullYear();

export const getCurrentMonth = () => new Date().getMonth() + 1;

const getCurrentDate = () => {
	const dateNow = new Date();
	const year = dateNow.getFullYear();
	const month = dateNow.getMonth();
	const totalMonths = 12 * year + month;
	return { year, month, totalMonths };
};

export const getDateFromAge = (months, years) => {
	const totalMonths = 12 * years + months;
	const monthsDiff = getCurrentDate().totalMonths - totalMonths;
	const year = Math.floor(monthsDiff / 12);
	const month = (monthsDiff % 12) + 1;
	return [month, year];
};

export const getAgeFromDate = (month, year) => {
	const totalMonths = 12 * year + month - 1;
	const monthsDiff = getCurrentDate().totalMonths - totalMonths;
	const years = Math.floor(monthsDiff / 12);
	const months = monthsDiff % 12;
	return [months, years];
};

export const limitDateToToday = (month, year) => {
	const currentDate = getCurrentDate();
	const totalMonths = 12 * year + month - 1;
	const monthsDiff = currentDate.totalMonths - totalMonths;
	const limitedMonth = monthsDiff > 0 ? month : currentDate.month + 1;
	const limitedYear = monthsDiff > 0 ? year : currentDate.year;
	return [limitedMonth, limitedYear];
};
