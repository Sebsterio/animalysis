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

export const ReportsList = ({ data }) => {
	const clx = useStyles();

	if (!data.length) return <Typography variant="h6">No reports</Typography>;

	return (
		<div>
			<ButtonGroup
				fullWidth
				orientation="vertical"
				// variant="text"
				// variant="contained"
				children={data.map(({ date, title }) => (
					<Button className={clx.report}>
						<span className={clx.date}>{getDateString(date)}</span>
						<span className={clx.title}>{title}</span>
					</Button>
				))}
			></ButtonGroup>
		</div>
	);
};
