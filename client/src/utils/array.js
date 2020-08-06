export const getPoppedArray = (arr) => {
	const newArr = [...arr];
	newArr.pop();
	return newArr;
};

export const getLastIndexOf = (arr, selector) => {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (selector(arr[i])) return i;
	}
};

export const arrayify = (element) => {
	if (Array.isArray(element)) return element;
	if (element === null || element === undefined) return [];
	return [element];
};

export const getArrayWithRemovedItem = (array, item) =>
	array.filter((curItem) => curItem !== item);

// PUSH item if not present
export const makeArrayWithAddedUniqueItem = (array, item) => {
	if (!array.includes(item)) return [...array, item];
	return [...array];
};

// MODIFY array item; supports negative index (counted form end)
export const makeArrayWithModifiedItem = (arr, index, modifier) => {
	const newArr = [...arr];
	if (index < 0) index = newArr.length + index;
	newArr[index] = modifier(newArr[index]);
	return newArr;
};
