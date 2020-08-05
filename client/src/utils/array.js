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
	return [element];
};

export const getArrayWithRemovedItem = (array, item) =>
	array.filter((curItem) => curItem !== item);
