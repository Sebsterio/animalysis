import React from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { getCurrentYear } from "utils/date";

// Aux
const req = true;
const derrived = true;
const max = getCurrentYear();

// prettier-ignore
export default ({
	hasPhoto,
	nameError,
	showAge,
	toggleShowAge,
	showKg,
	toggleShowKg,
	isSaved,
	deletePet,
	disabled,
}) => {
	const formFields = [
		// Image
		[ "file",	"imageUrl",	{ disabled,
				label: <PhotoCamera color={hasPhoto || disabled ? "action" : "primary"} />,
		}],

		// Name
		["text", "name", { req, err: nameError }],

		// Species
		["select", "species", { req, options: ["canine", "feline"] }],

		// Sex
		["select", "sex",	{ req, options: [
			"male entire",
			"male neutered",
			"female entire",
			"female neutered",
		]}],

		// Breed
		["text", "breed", { req }],

		// Age
		[ "group", "ageSwitch",	{
				layout: "row--right-item-auto",
				fields: [
					showAge
						? [	"group", "age",	{ layout: "row", fields: [
									[	"number", "ageYears", { label: "Years", max: 25, req, derrived }],
									[ "number", "ageMonths", { label: "Months", max: 11, derrived } ]
								],
							}]
						: [ "group", "birthDate", { layout: "row", fields: [
									[ "number", "birthYear", { label: "Birth Year", min: 1995, max, req }],
									[ "number", "birthMonth", { label: "Birth Month", min: 1, max: 12 }],
								],
							}],
					[ "button", "ageSwitchToggle", { handler: toggleShowAge, label: showAge ? "Date" : "Age" }],
				],
		}],

		// Weight
		[ "group", "weightSwitch", {
				layout: "row--right-item-auto",
				fields: [
					showKg
						? ["number", "weight", { label: "Weight (kg)", max: 100 }]
						: ["number", "weightLbs", { label: "Weight (lbs)", max: 220 }],
					[ "button", "weightSwitchToggle", { handler: toggleShowKg, label: showKg ? "Lbs" : "Kg" }]
				]
		}],

		// Microchip
		["text", "microchip", { label: "Microchip number" }]
	];

	// Delete button
	if (isSaved)
		formFields.push([ "button", "remove", {
				handler: deletePet,
				label: "Delete Pet",
				color: "secondary",
				disabled,
			},
		]);

	return formFields;
};
