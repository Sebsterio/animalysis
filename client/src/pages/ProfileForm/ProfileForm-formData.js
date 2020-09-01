// Aux
const req = true;

export const formFields = [
	["text", "firstName"],
	["text", "surname"],
	["tel", "phone", { req, label: "Telephone" }],
];
