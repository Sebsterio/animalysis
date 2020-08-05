export const shallowCompare = (obj1, obj2) =>
	Object.keys(obj1).length === Object.keys(obj2).length &&
	Object.keys(obj1).every((key) => obj1[key] === obj2[key]);

export const isEmpty = (obj) => !Object.keys(obj).length;
