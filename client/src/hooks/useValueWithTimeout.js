import { usePrevWithTimeout } from "./index";

// Return value based on given async status
// When process is done return valueDone and, after timeout, valueDefault
// When process is ongoing, return valueOngoing
export const useValueWithTimeout = ({
	isOngoing, // async status
	valueDefault, // if is not ongoing
	valueOngoing,
	valueDone,
	timeout,
}) => {
	const wasOngoing = usePrevWithTimeout(isOngoing, timeout);

	if (!isOngoing && wasOngoing) return valueDone;
	if (isOngoing) return valueOngoing;
	return valueDefault;
};
