import { getCurrentYear, getCurrentMonth } from "utils/date";

export const defaultPet = {
	birthYear: getCurrentYear(),
	birthMonth: getCurrentMonth(),
	weight: 0,
};
