// Aux
const req = true;
const multiline = true;

export default ({ emailError, isAdmin }) => {
	const disabled = !isAdmin;

	const formFields = [
		["text", "name", { req, label: "Clinic name", disabled }],
		["email", "email", { req, err: emailError, disabled }],
		["tel", "phone", { req, label: "Telephone", disabled }],
		["tel", "phone2", { label: "Telephone 2", disabled }],
		["text", "address", { req, multiline, disabled }],
	];

	return formFields;
};
