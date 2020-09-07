// Filtered out object props that aren't listed in propNames array
const makeObjectWithSelectedProps = (obj, propNames) => {
	const newObj = {};
	propNames.forEach((prop) => (newObj[prop] = obj[prop]));
	return newObj;
};

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
	makeObjectWithSelectedProps,
	makeObjectWithoutUndefinedProps,
	isEmpty,
};
