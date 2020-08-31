export const getInputDataFromForm = (form, ...inputNames) => {
	const data = {};
	inputNames.forEach((name) => {
		if (form[name] !== undefined) data[name] = form[name].value;
	});
	return data;
};

export const getTruthyInputDataFromForm = (form, ...inputNames) => {
	const data = {};
	inputNames.forEach((name) => {
		if (!!form[name]) data[name] = form[name].value;
	});
	return data;
};
