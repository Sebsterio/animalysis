export const stopPropagation = (e) => e.stopPropagation();

export const getStepsFromDirection = (direction) =>
	direction === "down" ? 1 : direction === "up" ? -1 : 0;
