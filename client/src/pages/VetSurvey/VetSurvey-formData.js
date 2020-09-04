// AUX
const req = true;

const sexConfig = {
	options: ["male entire", "male neutered", "female entire", "female neutered"],
	req,
};

export const formFields = [
	["text", "name", { req }],
	["select", "species", { options: ["canine", "feline"], req }],
	["select", "sex", sexConfig],
];
