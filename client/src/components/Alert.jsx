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
	alertFrame: ({ color, backgroundColor, clickHandler }) => ({
		border: `2px solid ${color}`,
		background: backgroundColor,
		minWidth: "8em",
		justifyContent: "center",
		margin: "auto",
		cursor: clickHandler ? "pointer" : null,
	}),
	alertText: {
		margin: 0,
		textTransform: "uppercase",
	},
}));

export const Alert = ({ level, alignLeft, clickHandler }) => {
	const data = alertData[level];
	const c = useStyles({ ...data, alignLeft, clickHandler });

	const { urgency } = data;

	return (
		<div className={c.container}>
			<Typography children="Urgency Level" variant="h5" />
			<AlertFrame
				className={c.alertFrame}
				icon={false}
				onClick={clickHandler || null}
			>
				<AlertTitle className={c.alertText}>{urgency}</AlertTitle>
			</AlertFrame>
		</div>
	);
};
