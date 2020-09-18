import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
	row: {
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
	},
	logo: { marginRight: theme.spacing(2) },
}));

export const ClinicSnippet = ({ clinic }) => {
	const c = useStyles();
	const { logoUrl, name } = clinic;

	return (
		<div className={c.row}>
			{logoUrl && (
				<div className={c.logo}>
					<Avatar alt={name + " logo"} src={logoUrl} />
				</div>
			)}
			<Typography variant="h6">{name}</Typography>
		</div>
	);
};
