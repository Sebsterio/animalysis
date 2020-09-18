export const convertFileToBlob = (pet, propName) => {
	const { [propName]: file } = pet;
	if (!file || typeof file === "string") return pet;
	const blob = URL.createObjectURL(file);
	return { ...pet, [propName]: blob };
};
