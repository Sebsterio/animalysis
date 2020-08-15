import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Alert as AlertFrame, AlertTitle } from "@material-ui/lab";
import { alertData } from "./Alert-data";

const useStyles = makeStyles((theme) => ({
	container: ({ orientation }) => ({
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
	}),
	alert: ({ color, backgroundColor }) => ({
		border: `2px solid ${color}`,
		background: backgroundColor,
	}),
	alertText: {
		margin: 0,
		textTransform: "uppercase",
	},
}));

export const Alert = ({ level, orientation }) => {
	const data = alertData[level];
	const clx = useStyles({ ...data, orientation });

	const { urgency } = data;

	return (
		<div className={clx.container}>
			<Typography children="Urgency Level: " variant="h5" />
			<AlertFrame className={clx.alert} icon={false}>
				<AlertTitle className={clx.alertText}>{urgency}</AlertTitle>
			</AlertFrame>
		</div>
	);
};
