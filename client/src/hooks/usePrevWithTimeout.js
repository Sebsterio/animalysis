import { useRef, useEffect, useReducer } from "react";

// Return previous value and update it back to inital value after timeout
export const usePrevWithTimeout = (value, timeout = 1500) => {
	const initialValue = value;
	const ref = useRef();
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		let mounted = true;
		ref.current = value;
		setTimeout(() => {
			if (!mounted) return; // prevent memory leak
			ref.current = initialValue;
			forceUpdate();
		}, timeout);
		return () => (mounted = false);
	}, [value, initialValue, timeout]);

	return ref.current;
};
