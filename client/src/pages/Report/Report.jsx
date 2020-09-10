import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Dialog } from "@material-ui/core";
import { Page, Alert } from "components";
import { Head, ProblemList } from "./components";
import { getDateString } from "utils/date";
import { summaryData } from "pages/Summary/Summary-data";

const useStyles = makeStyles((theme) => ({
	dialogContent: { padding: theme.spacing(3) },
	footerButton: { margin: theme.spacing(0.3, 0) },
}));

const Report = ({ history, match, getReport, getPet, isVet }) => {
	const c = useStyles();

	const [dialogOpen, setDialogOpen] = useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	const { id } = match.params;
	if (!id) return <Redirect to="/not-found" />;

	const report = getReport(id);
	if (!report) return null;

	const { petId, dateCreated, title, alert, problemList } = report;
	const { sending, sent, dateSeen } = report;
	const pet = getPet(petId);
	const dialogText = summaryData[alert].textMain(pet);

	// Vet: end preview; Client: back to pet's page
	const closePage = () => {
		if (!isVet) history.push("/pet/" + pet.name);
		else history.goBack(); // can be either SurveyEditor or Dashboard
	};

	const contactOwner = () => history.push("/user/" + pet.userId);

	return (
		<>
			<Page
				header={<Head {...{ pet, isVet }} />}
				main={
					<>
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
							{!isVet && (
								<Typography
									component="h3"
									variant="body1"
									color="textSecondary"
									align="center"
									children={
										dateSeen
											? "Delivered"
											: sent
											? "Sent"
											: sending
											? "Sending..."
											: "Not sent!"
									}
								/>
							)}
						</div>
						<Alert level={alert} clickHandler={openDialog} small alignLeft />

						{!!problemList.length && (
							<div className={c.section}>
								<Typography variant="h6" children="Issues" gutterBottom />
								<ProblemList data={problemList} />
							</div>
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
								children="Contact owner"
								onClick={contactOwner}
								disabled={!pet.userId}
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
