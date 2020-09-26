import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Dialog } from "@material-ui/core";
import { Alert as MUI_Alert } from "@material-ui/lab";
import { Page, Alert, PetSnippet } from "components";
import { ProblemList } from "./components";
import { getDateString } from "utils/date";
import { summaryData } from "pages/Summary/Summary-data";

const useStyles = makeStyles((theme) => ({
	dialogContent: { padding: theme.spacing(3) },
	link: { textDecoration: "none" },
	alert: { marginBottom: theme.spacing(2), alignItems: "center" },
	footerButton: { margin: theme.spacing(0.3, 0) },
}));

const Report = ({
	history,
	match,
	getReport,
	getPet,
	isVet,
	isDemo,
	resendReport,
	clinicIsSet,
	userHasPhone,
}) => {
	const c = useStyles();

	const [dialogOpen, setDialogOpen] = useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	// --------------- Props derrived from URL param ---------------

	const { id } = match.params;
	const report = getReport(id);
	if (!report) return null;

	const { petId, dateCreated, title, alert, problemList } = report;
	const { sending, sent, dateSeen } = report;

	const pet = getPet(petId);

	const dialogText = summaryData[alert].textMain(pet);

	// ----------------------- Handlers ----------------------------

	// Vet: end preview; Client: back to pet's page
	const closePage = () => {
		if (!isVet) history.push("/pet/" + pet.name);
		else history.goBack(); // can be either SurveyEditor or Dashboard
	};

	const contactOwner = () => history.push("/client/" + pet.userId);

	const viewPet = () => history.push("/pet/" + pet.id);

	const sendReport = () => resendReport({ id: report.id, petId });

	// ------------------------- View ------------------------------

	return (
		<>
			<Page
				header={
					// separte content from parent's grid layout
					<div>
						{isVet ? null : !clinicIsSet ? (
							<Link to="/my-clinic" className={c.link}>
								<MUI_Alert
									severity="error"
									children="You haven't chosen a clinic to send reports to. Click here to add one."
									className={c.alert}
								/>
							</Link>
						) : !userHasPhone ? (
							<Link to="/profile" className={c.link}>
								<MUI_Alert
									severity="warning"
									children="Add a phone number so that your clinic can contact you."
									className={c.alert}
								/>
							</Link>
						) : null}

						<div className={c.titleBlock}>
							<Typography
								component="h2"
								variant="h4"
								align="center"
								children={title}
							/>
							<Typography
								component="h3"
								variant="body1"
								color="textSecondary"
								align="center"
								children={getDateString(dateCreated)}
							/>
						</div>
					</div>
				}
				main={
					<>
						<PetSnippet pet={pet} small />

						<Alert level={alert} clickHandler={openDialog} small alignLeft />

						{!!problemList.length && (
							<div className={c.section}>
								<Typography variant="h6" children="Issues" gutterBottom />
								<ProblemList data={problemList} />
							</div>
						)}

						{!isVet && (
							<Typography
								component="h3"
								variant="body1"
								align="center"
								children={
									dateSeen
										? "Received by clinic"
										: sent
										? "Report Sent"
										: sending
										? "Sending..."
										: isDemo
										? "Posting reports is disabled in demo"
										: "Report not sent!"
								}
								color={sent || sending ? "textSecondary" : "secondary"}
							/>
						)}
					</>
				}
				footer={
					<>
						{isVet && (
							<Button
								fullWidth
								className={c.footerButton}
								variant="outlined"
								color="primary"
								children="View pet"
								onClick={viewPet}
								disabled={!pet.userId}
							/>
						)}
						{isVet && (
							<Button
								fullWidth
								className={c.footerButton}
								variant="outlined"
								color="primary"
								children="Contact owner"
								onClick={contactOwner}
								disabled={!pet.userId}
							/>
						)}
						{!sent && !sending && !isDemo && (
							<Button
								fullWidth
								className={c.footerButton}
								variant="contained"
								color="primary"
								children={sending ? "Sending..." : "Send report"}
								onClick={sendReport}
							/>
						)}
						<Button
							fullWidth
							className={c.footerButton}
							variant="outlined"
							color="default"
							children="Close"
							onClick={closePage}
						/>
					</>
				}
			/>

			<Dialog open={dialogOpen} onClose={closeDialog} maxWidth="xs">
				<Typography className={c.dialogContent} children={dialogText} />
			</Dialog>
		</>
	);
};

export default Report;
