import { getCurrentYear } from "utils/date";

// Aux
const req = true;

// Age form section
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

export const formFields = [
	["text", "name", { req }],
	["select", "species", { options: ["canine", "feline"], req }],
	["select", "sex", { options: ["male", "female"], req }],
	["text", "breed", { req }],
	["group", "birthDate", birthDateConfig],
	["number", "weight", { max: 100 }],
	["text", "microchip", { label: "Microchip number" }],
];
