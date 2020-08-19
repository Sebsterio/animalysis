import React from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { getCurrentYear } from "utils/date";

export default ({
	nameError,
	showAge,
	toggleShowAge,
	showKg,
	toggleShowKg,
}) => {
	// Aux
	const req = true;
	const derrived = true;

	// Sex form field
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
			["number", "ageYears", { label: "Years", max: 25, req, derrived }],
			["number", "ageMonths", { label: "Months", max: 11, derrived }],
		],
	};
	const ageSwitchButtonConfig = {
		handler: toggleShowAge,
		label: showAge ? "Age" : "Date",
	};
	const ageSwitchConfig = {
		layout: "row--right-item-auto",
		fields: [
			showAge
				? ["group", "age", ageConfig]
				: ["group", "birthDate", birthDateConfig],
			["button", "ageSwitchToggle", ageSwitchButtonConfig],
		],
	};

	// Weight form section
	const weightSwitchButtonConfig = {
		handler: toggleShowKg,
		label: showKg ? "Kg" : "Lbs",
	};
	const weightSwitchConfig = {
		layout: "row--right-item-auto",
		fields: [
			showKg
				? ["number", "weight", { max: 100 }]
				: ["number", "weightLbs", { max: 220, label: "Weight" }],
			["button", "weightSwitchToggle", weightSwitchButtonConfig],
		],
	};

	return [
		["file", "imageUrl", { label: <PhotoCamera color="primary" /> }],
		["text", "name", { req, err: nameError }],
		["select", "species", { options: ["canine", "feline"], req }],
		["select", "sex", sexConfig],
		["text", "breed", { req }],
		["group", "ageSwitch", ageSwitchConfig],
		["group", "weightSwitch", weightSwitchConfig],
		["text", "microchip", { label: "Microchip number" }],
	];
};
