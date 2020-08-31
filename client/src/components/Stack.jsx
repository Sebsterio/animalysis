import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	stack: {
		display: "grid",
		gridGap: theme.spacing(3),
	},
}));

export const Stack = ({ children }) => {
	const c = useStyles();
	return <div className={c.stack}>{children}</div>;
};
