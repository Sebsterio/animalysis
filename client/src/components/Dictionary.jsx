import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		display: "grid",
		gridTemplateColumns: ({ compact }) =>
			`repeat(${compact ? "2" : "1"}, 1fr 3fr)`,
		gridGap: theme.spacing(2),
		alignItems: "center",
	},
}));

export const Dictionary = ({ children, compact }) => {
	const c = useStyles({ compact });
	return <div className={c.root}>{children}</div>;
};
