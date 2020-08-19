/*******************************************************
 * Check for unfilled fields and return negated result (for efficiency)
 * @param fields - data used for Form field prop
 * @param state - object that controls the form
 ********************************************************/

export const isFormFilled = (fields, state) =>
	!fields.some((field) => {
		const [type, name, config] = field;
		if (type === "group") return !isFormFilled(config.fields, state);
		if (config && config.req) return state[name] === undefined;
		return false;
	});
