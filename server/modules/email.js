const nodemailer = require("nodemailer");

const ERROR_EMAIL_ADDRESS = "sebastian.rosloniec@gmail.com";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "animalysis.reports@gmail.com",
		pass: "nppnokdwwmyaqvjc",
	},
});

const sendErrorEmailToDev = ({ error, msg }) =>
	transporter.sendMail({
		from: "animalysis.reports@gmail.com",
		to: ERROR_EMAIL_ADDRESS,
		subject: "Animalysis error",
		text: `${msg} \n${error} \n${JSON.stringify(error)}`,
	});

module.exports = { transporter, sendErrorEmailToDev };
