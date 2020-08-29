import shortid from "shortid";
import {
	makeArrayWithPushedItems,
	makeArrayWithRemovedItems,
	makeArrayWithMovedItem,
} from "utils/array";

shortid.characters(
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_"
);

export const getNewId = () => shortid.generate();

export const getNewName = () => "_" + getNewId();

// Add correct input prop to data to be submitted
// Convert format if needed
export const includeInputValue = (data, e) => {
	let { type, name, value, checked } = e.target;
	if (type === "number") value = Number(value);
	else if (type === "checkbox") value = checked;
	data[name] = value;
};

// move-up/down util
export const getStepsFromDirection = (direction) =>
	direction === "down" ? 1 : direction === "up" ? -1 : 0;

// fake event object holding data about "target" input action
export const makeNestedTargetEvent = (action, sectionName, direction) => ({
	target: { name: "target", action, sectionName, direction },
});

// "after" input event value modifier
// selecting 'none' or 'all' deselcts all sectionNames options
// selecting an sectionNames option deselcts 'none' and 'all'
export const makeModifiedAfter = (e, currentAfter) => {
	let { value } = e.target;
	return value.includes("none")
		? !currentAfter.includes("none")
			? ["none"]
			: value.filter((v) => v !== "none")
		: value.includes("all")
		? !currentAfter.includes("all")
			? ["all"]
			: value.filter((v) => v !== "all")
		: value;
};

// "target" input event value modifier
// handles add/delete/move target
export const makeModifiedTarget = (e, currentTarget) => {
	const { sectionName, action, direction } = e.target;
	return action === "add"
		? makeArrayWithPushedItems(currentTarget, sectionName)
		: action === "delete"
		? makeArrayWithRemovedItems(currentTarget, sectionName)
		: action === "move"
		? makeArrayWithMovedItem(
				currentTarget,
				sectionName,
				getStepsFromDirection(direction)
		  )
		: currentTarget;
};

// prettier-ignore
export 	const getAlertMessage = (alertCode) => {
	switch (alertCode) {
		case 1:	return "green";
		case 2:	return "yellow";
		case 3:	return "orange";
		case 4:	return "red";
		default: return "none";
	}
};
