import { useRef, useEffect, useReducer } from "react";

// Return previous value and update it back to inital value after timeout
export const usePrevWithTimeout = (value, timeout = 1000) => {
	const initialValue = value;
	const ref = useRef();
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		ref.current = value;
		setTimeout(() => {
			ref.current = initialValue;
			forceUpdate();
		}, timeout);
	}, [value, initialValue, timeout]);

	return ref.current;
};
