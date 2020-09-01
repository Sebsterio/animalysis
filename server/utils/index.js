// Filter out undefined props from an object
const makeObjectWithoutUndefinedProps = (curObject) => {
	const newObject = {};
	Object.entries(curObject).forEach(([key, value]) => {
		if (value !== undefined) newObject[key] = value;
	});
	return newObject;
};

const isEmpty = (obj) => !Object.keys(obj).length;

module.exports = {
	makeObjectWithoutUndefinedProps,
	isEmpty,
};
