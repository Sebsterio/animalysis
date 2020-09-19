// Aux
const req = true;
const multiline = true;

export default ({ emailError, disabled, hasPhoto }) => {
	const addresConfig = {
		req,
		multiline,
		disabled,
		helperText: 'Use commas "," to separate address lines',
	};

	const logoUrlConfig = {
		label: hasPhoto ? "Change logo" : "Upload logo",
		disabled,
	};

	const formFields = [
		["file", "logoUrl", logoUrlConfig],
		["text", "name", { req, label: "Clinic name", disabled }],
		["email", "email", { req, err: emailError, disabled }],
		["tel", "phone", { req, label: "Telephone", disabled }],
		["tel", "phone2", { label: "Telephone 2", disabled }],
		["text", "address", addresConfig],
	];

	return formFields;
};
