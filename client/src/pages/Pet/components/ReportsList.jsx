import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button, Typography } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { getDateString } from "utils/date";
import { alertData } from "components/Alert-data";

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

	if (!reports.length)
		return (
			<Typography variant="h6" align="center">
				No reports...
			</Typography>
		);

	const openReport = (id) => history.push(`/report/${id}`);

	const getStyle = (alert) => ({ color: alertData[alert].color });

	return (
		<div>
			<ButtonGroup
				fullWidth
				orientation="vertical"
				children={reports.map(({ id, date, title, alert }) => (
					<Button className={clx.report} onClick={() => openReport(id)}>
						<span className={clx.date}>{getDateString(date)}</span>
						<span className={clx.title}>{title}</span>
						<FiberManualRecordIcon style={getStyle(alert)} />
					</Button>
				))}
			></ButtonGroup>
		</div>
	);
};
