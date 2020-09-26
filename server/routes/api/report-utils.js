const utils = require("../../utils");
const emailModule = require("../../modules/email");
const Clinic = require("../../models/clinic");

// -------------------------- Filter data --------------------------

const { makeObjectWithSelectedProps, makeObjectWithoutUndefinedProps } = utils;

const filterReport = (report) => {
	const allowedProps = [
		"petId",
		"dateCreated",
		"dateUpdated",
		"title",
		"alert",
		"problemList",
		"dateSeen",
	];
	const filteredPet = makeObjectWithSelectedProps(report, allowedProps);
	return makeObjectWithoutUndefinedProps(filteredPet);
};

// --------------------------- Report email ------------------------

const { transporter, sendErrorEmailToDev } = emailModule;

// Get clinic email address
// ClinicId: send email if emailNotifications are on
// ClinicInfo: send email if clinic is not registered or emailNotifications are on
const getClinicEmail = async ({ clinicId, clinicInfo }) => {
	if (clinicId) {
		const clinic = await Clinic.findById(clinicId);
		if (!clinic) return false;
		if (!clinic.emailNotifications) return "notifications-off";
		return clinic.email;
	} else if (clinicInfo && clinicInfo.email) {
		const { email } = clinicInfo;
		const clinic = await Clinic.findOne({ email });
		if (clinic && !clinic.emailNotifications) return "notifications-off";
		return email;
	}
	return false; // user doesn't have a clinic
};

// prettier-ignore
const getAlertName = (level) =>
	level === 0	? "none" :
	level === 1	? "low" :
	level === 2	? "medium" :
	level === 3	? "high" :
	level === 4	? "critical" :
	"(ERROR)";

// prettier-ignore
const createReportEmailBody = ({report, user, pet}) => {
	const { title, alert, problemList } = report;
	const { profile, email } = user;
	const {firstName, surname} = profile
	const userName = firstName + (surname ? (" " + surname) : "");
	return `
		<h2>${title}</h2>
		<p><b>Owner's name:</b> ${userName}</p>
		<p><b>Owner's email:</b> ${email}</p>
		<p><b>Pet's name:</b> ${pet.name}</p>
		<p><b>Urgency level:</b> ${getAlertName(alert)}</p>
		${problemList.length 
			? `<p><b>Problems:</b></p>
				<p><ul>
					${problemList.map(({ print, printNote }) => `
						<li>${print ? print : printNote ? printNote : ""}</li>`
					).join('')}
				</ul></p>`
			: ""}
		<p>You can contact the owner by replying to this email.</p>
		<p>To create a free Animalysis account, click <a href="https://animalysis.com">here</a>.</p>
	`;
};

const sendReportByEmail = async ({ clinicEmail, user, report, pet }) => {
	try {
		const { email: userEmail, profile } = user;
		const mailOptions = {
			from: userEmail, // doesn't seem to work with gmail
			replyTo: userEmail,
			to: clinicEmail,
			subject: "New Report: " + report.title,
			html: createReportEmailBody({ report, user, pet }),
		};
		return await transporter.sendMail(mailOptions);
	} catch (err) {
		return false;
	}
};

// ----------------------------------------------------------------

module.exports = { filterReport, getClinicEmail, sendReportByEmail };
