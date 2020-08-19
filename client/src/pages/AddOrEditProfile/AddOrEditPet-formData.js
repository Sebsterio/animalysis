import { getCurrentYear } from "utils/date";

export default ({ nameError }) => {
	// Aux
	const req = true;

	// Birth date form section
	const max = getCurrentYear();
	const birthYearConfig = { label: "Birth Year", min: 1995, max, req };
	const birthMonthConfig = { label: "Birth Month", min: 1, max: 12 };
	const birthDateConfig = {
		layout: "row",
		fields: [
			["number", "birthYear", birthYearConfig],
			["number", "birthMonth", birthMonthConfig],
		],
	};

	// Age form section
	const ageYearsConfig = { label: "Age (years)", max: 25, req };
	const ageMonthsConfig = { label: "Age (months)", max: 11 };
	const ageConfig = {
		layout: "row",
		fields: [
			["number", "ageYears", ageYearsConfig],
			["number", "ageMonths", ageMonthsConfig],
		],
	};

	// Sex form section
	const sexConfig = {
		options: ["male entire", "male neutred", "female entire", "female neutred"],
		req,
	};

	return [
		["text", "name", { req, err: nameError }],
		["select", "species", { options: ["canine", "feline"], req }],
		["select", "sex", sexConfig],
		["text", "breed", { req }],
		["group", "birthDate", birthDateConfig],
		["group", "age", ageConfig],
		["number", "weight", { max: 100 }],
		["text", "microchip", { label: "Microchip number" }],
	];
};
