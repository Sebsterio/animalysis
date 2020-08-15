import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Alert as AlertFrame, AlertTitle } from "@material-ui/lab";
import { alertData } from "./Alert-data";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: ({ alignLeft }) => (alignLeft ? "stretch" : "space-evenly"),
		alignItems: "center",
	},
	alertFrame: ({ color, backgroundColor }) => ({
		border: `2px solid ${color}`,
		background: backgroundColor,
		minWidth: "8em",
		justifyContent: "center",
		margin: "auto",
	}),
	alertText: {
		margin: 0,
		textTransform: "uppercase",
	},
}));

export const Alert = ({ level, alignLeft }) => {
	const data = alertData[level];
	const clx = useStyles({ ...data, alignLeft });

	const { urgency } = data;

	return (
		<div className={clx.container}>
			<Typography children="Urgency Level: " variant="h5" />
			<AlertFrame className={clx.alertFrame} icon={false}>
				<AlertTitle className={clx.alertText}>{urgency}</AlertTitle>
			</AlertFrame>
		</div>
	);
};
