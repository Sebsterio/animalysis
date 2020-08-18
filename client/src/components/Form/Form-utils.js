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

/*******************************************************
 * Add error message prop to field if condition is met
 * @param fields - data used for Form field prop
 * @param errors - map of state props to error status and message
 * 	{ statePropName: { isError (Bool), message (Str) } }
 ********************************************************/

export const addErrors = (fields, errors) =>
	fields.map((field) => {
		const [type, name, config] = field;
		const error = errors[name];
		if (type === "group") {
			const { fields } = config;
			field[2] = { ...config, fields: addErrors(fields, errors) };
		} else if (error) {
			const { isError, message } = error;
			if (isError) field[2] = { ...config, err: message };
		}
		return field;
	});
