import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import { Alert } from "components/Alert";
import { ProblemList } from "./components";
import { PetSnippet } from "components/PetSnippet";
import { getDateString } from "utils/date";

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
}));

const Report = ({ history, match, getReport, getPet }) => {
	const clx = useStyles();

	const { id } = match.params;
	if (!id) return <Redirect to="/not-found" />;

	const report = getReport(id);
	const { petId, date, title, alert, problemList } = report;
	const pet = getPet(petId);

	console.log(history);

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

				<Alert level={alert} alignLeft />

				<Typography children="Problem List" component="h3" variant="h5" />
				<ProblemList data={problemList} />
			</div>

			<Button
				fullWidth
				variant="outlined"
				color="default"
				children="Close"
				className={clx.navButton}
				onClick={() => history.goBack()}
			/>
		</Container>
	);
};

export default Report;
