// Aux
const req = true;

export const formFields = [
	["text", "name"],
	["text", "surname"],
	["email", "email"],
	["tel", "phone", { req, label: "Telephone" }],
];
