const utils = require("../../utils");
const emailModule = require("../../modules/email");

// -------------------------- Filter data --------------------------

const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

// Get non-undefined Req props allowed to be spread in doc update
const filterUserReq = (user) => {
	const allowedProps = ["profile", "clinicInfo", "clinicId", "pets"];
	const filteredUser = makeObjectWithSelectedProps(user, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredUser);
};

// Get non-undefined User props allowed to be spread in the Response
const filterUserRes = (user) => {
	const allowedProps = [
		"email",
		"type",
		"demo",
		"profile",
		"clinic", // not cLinicId or clinicInfo
		"pets", // not petIds
		"dateModified",
	];
	const filteredUser = makeObjectWithSelectedProps(user, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredUser);
};

// --------------------------- Report email ------------------------

const { transporter } = emailModule;

const generateCode = () => {
	const code = [];
	for (let i = 0; i < 6; i++) {
		code.push(Math.floor(Math.random() * 10));
	}
	return code.join("");
};

const createResetPwEmailBody = ({ userName, code }) => `
	Dear ${userName},

	Your Animalysis security code is: 

	${code}

	If you haven't requested it, change your password immediately.

	Best Wishes,
	Animalysis Team
`;

const sendCodeByEmail = async ({ user, code }) => {
	try {
		const { email: userEmail, profile } = user;
		const { firstName: userName } = profile;
		const mailOptions = {
			from: "animalysis.reports@gmail.com",
			to: userEmail,
			subject: "Reset Your Animalysis Password",
			text: createResetPwEmailBody({ userName, code }),
		};
		return await transporter.sendMail(mailOptions);
	} catch (err) {
		return false;
	}
};

// ----------------------------------------------------------------

module.exports = {
	filterUserReq,
	filterUserRes,
	generateCode,
	sendCodeByEmail,
};
