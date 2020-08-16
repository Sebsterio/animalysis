import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button, Typography } from "@material-ui/core";
import { getDateString } from "utils/date";

const useStyles = makeStyles((theme) => ({
	report: {
		display: "flex",
	},
	date: {
		flex: "0 0 auto",
	},
	title: {
		flex: "0 1 100%",
		textAlign: "center",
		textTransform: "capitalize",
	},
}));

export const ReportsList = ({ history, reports }) => {
	const clx = useStyles();

	const openReport = (id) => history.push(`/report/${id}`);

	if (!reports.length)
		return (
			<Typography variant="h6" align="center">
				No reports...
			</Typography>
		);

	return (
		<div>
			<ButtonGroup
				fullWidth
				orientation="vertical"
				children={reports.map(({ id, date, title }) => (
					<Button className={clx.report} onClick={() => openReport(id)}>
						<span className={clx.date}>{getDateString(date)}</span>
						<span className={clx.title}>{title}</span>
					</Button>
				))}
			></ButtonGroup>
		</div>
	);
};
