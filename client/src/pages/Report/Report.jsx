import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import { Alert } from "components/Alert";
import { ProblemsList } from "./components";
import { getDateString } from "utils/date";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	main: {
		display: "grid",
		gridGap: theme.spacing(3),
	},
}));

const Report = ({ history, match, getReport, recentReport }) => {
	const clx = useStyles();

	const { id } = match.params;
	const report = id ? getReport(id) : recentReport;
	if (!report) return <Redirect to="/not-found" />;

	const handleClose = () => history.push("/");

	const { date, title, alert, problemList } = report;

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Typography
				variant="h5"
				align="center"
				children={`${getDateString(date)} - ${title}`}
			/>

			<Container className={clx.main}>
				<Alert level={alert} alignLeft />
				<Typography
					children="Problems List"
					component="h3"
					variant="h5"
					// align="center"
				/>
				<ProblemsList data={problemList} />
			</Container>

			<Button
				fullWidth
				variant="outlined"
				color="default"
				children="Close"
				className={clx.navButton}
				onClick={handleClose}
			/>
		</Container>
	);
};

export default Report;

// return (
//  <>
// 	 {print && <div>{print}</div>}
// 	 {printNote && <div>NOTE: {printNote}</div>}
//  </>
// );
