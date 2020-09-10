import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		display: "grid",
		gridTemplateColumns: "1fr 2fr",
		gridGap: theme.spacing(2),
		alignItems: "center",
	},
}));

export const Dictionary = ({ children }) => {
	const c = useStyles();
	return <div className={c.root}>{children}</div>;
};
