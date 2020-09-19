import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	stack: {
		display: "grid",
		gridGap: ({ dense }) => theme.spacing(dense ? 1 : 3),
	},
}));

export const Stack = ({ children, dense }) => {
	const c = useStyles({ dense });
	return <div className={c.stack}>{children}</div>;
};
