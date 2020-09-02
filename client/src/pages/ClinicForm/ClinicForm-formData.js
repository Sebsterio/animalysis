// Aux
const req = true;
const multiline = true;

export const formFields = [
	["text", "name", { req, label: "Clinic name" }],
	["email", "email", { req }],
	["tel", "phone", { req }],
	["text", "address", { multiline }],
];
