import { getDateFromAge, limitDateToToday, getAgeFromDate } from "utils/date";
import { arrayify } from "utils/array";

const didPropsChange = (state, newState, props) => {
	return arrayify(props).some((prop) => state[prop] !== newState[prop]);
};

// -------------- handler utils (incoming props) --------------

export const mapAgeToBirthDate = (pet, newPet) => {
	const datePropNames = ["birthMonth", "birthYear"];
	const datePropsChanged = didPropsChange(pet, newPet, datePropNames);
	if (datePropsChanged) return newPet;
	const { ageYears, ageMonths, ...agelessNewPet } = newPet;
	const dateFromAge = getDateFromAge(ageMonths || 0, ageYears || 0);
	const [month, year] = dateFromAge;
	const newProps = { birthMonth: month, birthYear: year };
	return { ...agelessNewPet, ...newProps };
};

export const limitBirthDateToToday = (pet) => {
	const limitedDate = limitDateToToday(pet.birthMonth, pet.birthYear);
	const [birthMonth, birthYear] = limitedDate;
	return { ...pet, birthMonth, birthYear };
};

export const convertFileToBlob = (pet) => {
	const { imageUrl: file } = pet;
	if (!file || typeof file === "string") return pet;
	const blob = URL.createObjectURL(file);
	return { ...pet, imageUrl: blob };
};

export const mapLbsToKg = (pet, newPet) => {
	const weightPropChanged = didPropsChange(pet, newPet, "weight");
	if (weightPropChanged) return newPet;
	const { weightLbs, ...poundlessNewPet } = newPet;
	const weight = Math.round((10 * weightLbs) / 2.20462) / 10;
	return { ...poundlessNewPet, weight };
};

// ------------- selector utils (outgoing props) --------------

export const mapBirthDateToAge = (pet) => {
	const { birthYear, birthMonth } = pet;
	const [ageMonths, ageYears] = getAgeFromDate(birthMonth, birthYear);
	return { ...pet, ageMonths, ageYears };
};

export const mapKgToLbs = (pet) => ({
	...pet,
	weightLbs: Math.round(pet.weight * 2.20462),
});
