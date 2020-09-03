// Aux
const req = true;
const multiline = true;

export default ({ emailError, deleteClinic, registered }) => {
	// Remove-pet button
	const deleteButtonConfig = {
		handler: deleteClinic,
		label: "Delete Organisation",
		color: "secondary",
	};

	const formFields = [
		["text", "name", { req, label: "Clinic name" }],
		["email", "email", { req, err: emailError }],
		["tel", "phone", { req, label: "Telephone" }],
		["text", "address", { req, multiline }],
	];

	if (registered) formFields.push(["button", "remove", deleteButtonConfig]);

	return formFields;
};
