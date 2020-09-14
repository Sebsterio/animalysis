// Add clicked row.id to array of selected rows
export const getNewSelected = (id, selected, selectedIndex) => {
	let newSelected = [];
	if (selectedIndex === -1) {
		newSelected = newSelected.concat(selected, id);
	} else if (selectedIndex === 0) {
		newSelected = newSelected.concat(selected.slice(1));
	} else if (selectedIndex === selected.length - 1) {
		newSelected = newSelected.concat(selected.slice(0, -1));
	} else if (selectedIndex > 0) {
		newSelected = newSelected.concat(
			selected.slice(0, selectedIndex),
			selected.slice(selectedIndex + 1)
		);
	}
	return newSelected;
};
