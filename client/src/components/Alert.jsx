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
	alertFrame: ({ color, backgroundColor, clickHandler, small, alignLeft }) => ({
		border: `2px solid ${color}`,
		background: backgroundColor,
		minWidth: small ? "6em" : "8em",
		justifyContent: "center",
		margin: alignLeft ? "auto" : 0,
		cursor: clickHandler ? "pointer" : null,
		padding: small ? 0 : undefined,
	}),
	alertText: {
		margin: 0,
		textTransform: "uppercase",
	},
}));

export const Alert = ({ level, alignLeft, clickHandler, small }) => {
	const data = alertData[level];
	const c = useStyles({ ...data, alignLeft, clickHandler, small });

	const { urgency } = data;

	return (
		<div className={c.container}>
			<Typography children="Urgency Level" variant={small ? "h6" : "h5"} />
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
