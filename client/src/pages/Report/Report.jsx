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
}));

const Report = ({ history, match, getReport, getPet, isVet }) => {
	const c = useStyles();

	const [dialogOpen, setDialogOpen] = useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	const { id } = match.params;
	if (!id) return <Redirect to="/not-found" />;

	const report = getReport(id);
	const { petId, dateCreated, title, alert, problemList } = report;
	const { sent, sending } = report;
	const pet = getPet(petId);
	const dialogText = summaryData[alert].textMain(pet);

	// Vet: end preview; Client: back to pet's page
	const closePage = () =>
		history.push(isVet ? "/survey/edit" : "/pet/" + pet.name);

	const sentStatus = sending ? "Sending" : sent ? "Sent" : "Not sent";

	return (
		<>
			<Page
				header={<Head pet={pet} />}
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
							<Typography
								component="h3"
								variant="body1"
								color="textSecondary"
								align="center"
								children={sentStatus}
							/>
						</div>
						<Alert level={alert} alignLeft clickHandler={openDialog} />

						{!!problemList.length && <ProblemList data={problemList} />}
					</>
				}
				footer={
					<Button
						fullWidth
						variant="outlined"
						color="default"
						children="Close"
						onClick={closePage}
					/>
				}
			/>

			<Dialog open={dialogOpen} onClose={closeDialog} maxWidth="xs">
				<Typography className={c.dialogContent} children={dialogText} />
			</Dialog>
		</>
	);
};

export default Report;
