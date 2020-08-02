export const getPoppedArray = (arr) => {
	const newArr = [...arr];
	newArr.pop();
	return newArr;
};
