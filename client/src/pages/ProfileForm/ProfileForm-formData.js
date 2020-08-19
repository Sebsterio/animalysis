import { getCurrentYear } from "utils/date";

export default ({ nameError, showAge, toggleShowAge }) => {
	// Aux
	const req = true;
	const derrived = true;

	// Sex form section
	const sexConfig = {
		options: ["male entire", "male neutred", "female entire", "female neutred"],
		req,
	};

	// Birth date and age form section
	const max = getCurrentYear();
	const birthDateConfig = {
		layout: "row",
		fields: [
			["number", "birthYear", { label: "Birth Year", min: 1995, max, req }],
			["number", "birthMonth", { label: "Birth Month", min: 1, max: 12 }],
		],
	};
	const ageConfig = {
		layout: "row",
		fields: [
			["number", "ageYears", { label: "Age (years)", max: 25, req, derrived }],
			["number", "ageMonths", { label: "Age (months)", max: 11, derrived }],
		],
	};
	const ageSwitchButtonConfig = {
		handler: toggleShowAge,
		label: showAge ? "Date" : "Age",
	};
	const ageSwitchConfig = {
		layout: "flex-row",
		fields: [
			showAge
				? ["group", "age", ageConfig]
				: ["group", "birthDate", birthDateConfig],
			["button", "ageSwitchToggle", ageSwitchButtonConfig],
		],
	};

	return [
		["text", "name", { req, err: nameError }],
		["select", "species", { options: ["canine", "feline"], req }],
		["select", "sex", sexConfig],
		["text", "breed", { req }],
		["group", "ageSwitch", ageSwitchConfig],
		["number", "weight", { max: 100 }],
		["text", "microchip", { label: "Microchip number" }],
	];
};
