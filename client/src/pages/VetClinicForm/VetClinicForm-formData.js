// Aux
const req = true;
const multiline = true;

export default ({ emailError }) => {
	const formFields = [
		["text", "name", { req, label: "Clinic name" }],
		["email", "email", { req, err: emailError }],
		["tel", "phone", { req, label: "Telephone" }],
		["text", "address", { req, multiline }],
	];

	return formFields;
};
