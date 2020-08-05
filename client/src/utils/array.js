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
