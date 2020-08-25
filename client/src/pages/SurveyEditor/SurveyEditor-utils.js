export const stopPropagation = (e) => e.stopPropagation();

export const moveArrayItem = (array, item, steps) => {
	const index = array.indexOf(item);
	const newIndex = index + steps;
	array.splice(newIndex, 0, array.splice(index, 1)[0]); // don't return
	return array;
};
