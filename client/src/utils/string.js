export const ensurePadding = (string, minLength) => {
	const paddingLength = minLength - string.length;
	if (paddingLength <= 0) return string;
	const padding = Array.from({ length: paddingLength }, () => "0").join();
	return padding + string;
};

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
