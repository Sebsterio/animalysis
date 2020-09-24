const nodemailer = require("nodemailer");
const Clinic = require("../models/clinic");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "animalysis.reports@gmail.com",
		pass: "nppnokdwwmyaqvjc",
	},
});

// prettier-ignore
const getAlertName = (level) =>
	level === 0	? "none" :
	level === 1	? "low" :
	level === 2	? "medium" :
	level === 3	? "high" :
	level === 4	? "critical" :
	"(ERROR)";

// prettier-ignore
const createEmailBody = ({report, user, pet}) => {
	const { title, alert, problemList } = report;
	const { profile, email } = user;
	const {firstName, surname} = profile
	const userName = firstName + (surname ? (" " + surname) : "");
	return `
		<h2>${title}</h2>
		<p><b>Urgency level:</b> ${getAlertName(alert)}</p>
		${problemList.length 
			? `<p><b>Problems:</b></p>
				<p><ul>
					${problemList.map(({ print, printNote }) => `
						<li>${print ? print : printNote ? printNote : ""}</li>`
					).join('')}
				</ul></p>`
			: ""}
		<p><b>Pet's name:</b> ${pet.name}</p>
		<p><b>Owner's name:</b> ${userName}</p>
		<p><b>Owner's email:</b> ${email}</p>
		<p>You can contact the owner by replying to this email.</p>
		<p>To create a free Animalysis account, click <a href="https://animalysis.com">here</a>.</p>
	`;
};

const sendReportByEmail = async ({ user, pet, report }) => {
	const { clinicInfo, clinicId, email: userEmail } = user;

	// Get clinic email address
	// ClinicId: send email if emailNotifications are on
	// ClinicInfo: send email if clinic is not registered or emailNotifications are on
	let clinicEmail;
	if (clinicId) {
		const clinic = await Clinic.findById(clinicId);
		if (clinic && clinic.emailNotifications) clinicEmail = clinic.email;
	} else if (clinicInfo && clinicInfo.email) {
		const { email } = clinicInfo;
		const clinic = await Clinic.findOne({ email });
		if (!clinic || clinic.emailNotifications) clinicEmail = email;
	}

	const mailOptions = {
		from: userEmail, // doesn't seem to work with gmail
		replyTo: userEmail,
		to: clinicEmail,
		subject: "New Report: " + report.title,
		html: createEmailBody({ report, user, pet }),
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			transporter.sendMail({
				from: "animalysis.reports@gmail.com",
				to: "sebastian.rosloniec@gmail.com",
				subject: "Animalysis error",
				text: `
					Error sending an email from ${userEmail} to ${clinicEmail}. \n
					${error} \n
					${JSON.stringify(error)}
				`,
			});
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports = { sendReportByEmail };
