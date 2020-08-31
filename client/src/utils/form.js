export const getInputDataFromForm = (form, ...inputNames) => {
	const data = {};
	inputNames.forEach((name) => {
		if (form[name] !== undefined) data[name] = form[name].value;
	});
	return data;
};
