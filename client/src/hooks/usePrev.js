import { useRef, useEffect } from "react";

// Return previous value (before update in useEffect)
export const usePrev = (value) => {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};
