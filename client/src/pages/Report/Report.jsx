import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, Dialog } from "@material-ui/core";
import { Alert, PetSnippet } from "components";
import { ProblemList } from "./components";
import { getDateString } from "utils/date";
import { summaryData } from "pages/Summary/Summary-data";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(2),
	},
	main: {
		margin: theme.spacing(4, 0, 0),
		display: "grid",
		gridGap: theme.spacing(4),
	},
	dialogContent: {
		padding: theme.spacing(3),
	},
}));

const Report = ({ history, match, getReport, getPet }) => {
	const clx = useStyles();

	const [dialogOpen, setDialogOpen] = useState(false);
	const openDialog = () => setDialogOpen(true);
	const closeDialog = () => setDialogOpen(false);

	const { id } = match.params;
	if (!id) return <Redirect to="/not-found" />;

	const report = getReport(id);
	const { petId, date, title, alert, problemList } = report;
	const pet = getPet(petId);
	const dialogText = summaryData[alert].textMain(pet);

	return (
		<Container maxWidth="xs" className={clx.page}>
			<div className={clx.header}>
				<PetSnippet pet={pet} small />
			</div>

			<div className={clx.main}>
				<div className={clx.titleBlock}>
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
						children={getDateString(date)}
					/>
				</div>

				<Alert level={alert} alignLeft clickHandler={openDialog} />

				<Dialog open={dialogOpen} onClose={closeDialog} maxWidth="xs">
					<Typography className={clx.dialogContent} children={dialogText} />
				</Dialog>

				<ProblemList data={problemList} />
			</div>

			<Button
				fullWidth
				variant="outlined"
				color="default"
				children="Close"
				className={clx.navButton}
				onClick={() => history.push("/pet/" + pet.name)}
			/>
		</Container>
	);
};

export default Report;
