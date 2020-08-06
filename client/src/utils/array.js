// ---------------------- Getters ----------------------

export const getLastIndexOf = (arr, selector) => {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (selector(arr[i])) return i;
	}
};

// --------------------- Converters -----------------------

export const arrayify = (element) => {
	if (Array.isArray(element)) return element;
	if (element === null || element === undefined) return [];
	return [element];
};

// ----------------------- Makers -------------------------

// PUSH item(s)
export const makeArrayWithPushedItems = (arr, items) => [
	...arr,
	...arrayify(items),
];

// PUSH item(s) if not already present and are unique
export const makeArrayWithAddedUniqueItems = (array, items) => {
	const newArr = [...array];
	arrayify(items).forEach((item) => {
		if (!newArr.includes(item)) newArr.push(item);
	});
	return newArr;
};

// UNSHIFT item(s)
export const makeArrayWithUnshiftedItems = (arr, items) => [
	...arrayify(items),
	...arr,
];

// POP item
export const makeArrayWithPoppedItem = (arr) => {
	const newArr = [...arr];
	newArr.pop();
	return newArr;
};

// SHIFT item
export const makeArrayWithShiftedItem = (arr) => {
	const newArr = [...arr];
	newArr.shift();
	return newArr;
};

// REMOVE item
export const makeArrayWithRemovedItem = (array, item) =>
	array.filter((curItem) => curItem !== item);

// MODIFY array item; supports negative index (counted form end)
export const makeArrayWithModifiedItem = (arr, index, modifier) => {
	const newArr = [...arr];
	if (index < 0) index = newArr.length + index;
	newArr[index] = modifier(newArr[index]);
	return newArr;
};

// INJECT items(s) after last array item that matched any target
export const makeArrayWithItemsInjectedAfterTargets = ({
	array,
	newItems, // item(s) to inject after all targets
	targets, // array item(s) after which to inject newItems
	// custom matcher of array items against target
	targetSelector = (item, target) => item === target,
}) => {
	const getTargetLastIndex = (target) =>
		getLastIndexOf(array, (item) => targetSelector(item, target));

	const lastMatchedTargetIndex = arrayify(targets).reduce((acc, target) => {
		const targetLastIndex = getTargetLastIndex(target);
		return targetLastIndex > acc ? targetLastIndex : acc;
	}, 0);

	let newArr = [...array];
	newArr.splice(lastMatchedTargetIndex + 1, 0, ...arrayify(newItems));
	return newArr;
};
