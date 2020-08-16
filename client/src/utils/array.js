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

// REMOVE item(s)
export const makeArrayWithRemovedItems = (
	array,
	item,
	selector = (curItem) => curItem === item
) => array.filter((curItem) => !selector(curItem));

// REPLACE item
export const makeArrayWithReplacedItem = (
	arr,
	oldItem,
	newItem,
	selector = (item) => item === oldItem
) => arr.map((item) => (selector(item) ? newItem : item));

// MODIFY array item - supports negative index (counted form end)
export const makeArrayWithModifiedItems = (
	arr,
	index,
	modifier,
	selector = (_item, i) => i === index
) => {
	if (index < 0) index = arr.length + index;
	return arr.map((item, i) => (selector(item, i) ? modifier(item) : item));
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
