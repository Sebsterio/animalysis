const nodemailer = require("nodemailer");

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
const createEmailBody = (report, user) => {
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
		<p><b>Owner's name:</b> ${userName}</p>
		<p><b>Owner's email:</b> ${email}</p>
		<p>You can contact the owner by replying to this email.</p>
		<p>To create a free Animalysis account, click <a href="https://animalysis.com">here</a>.</p>
	`;
};

const sendReportByEmail = async ({ user, report }) => {
	const { clinicInfo, email: userEmail } = user;
	if (!clinicInfo || !clinicInfo.email) return;

	const mailOptions = {
		from: userEmail,
		replyTo: userEmail,
		to: clinicInfo.email,
		subject: "New Report: " + report.title,
		html: createEmailBody(report, user),
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			transporter.sendMail({
				from: "animalysis.reports@gmail.com",
				to: "sebastian.rosloniec@gmail.com",
				subject: "Animalysis error",
				text: `Error sending an email from ${userEmail} to ${clinicInfo.email}.\n\n ${error}`,
			});
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports = { sendReportByEmail };
