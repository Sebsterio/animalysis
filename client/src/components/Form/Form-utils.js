/*******************************************************
 * Check for unfilled fields and return negated result (for efficiency)
 * @param fields - data used for Form field prop
 * @param state - object that controls the form
 ********************************************************/

export const isFormFilled = (fields, state) =>
	!fields.some((field) => {
		const [type, name, config] = field;
		if (!config) return false;
		const { req, derrived, fields } = config;
		if (type === "group") return !isFormFilled(fields, state);
		if (req && !derrived) return state[name] === undefined;
		return false;
	});
