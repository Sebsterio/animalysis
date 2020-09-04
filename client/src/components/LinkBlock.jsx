import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "block",
		textAlign: "right",
	},
}));

export const LinkBlock = ({ text, to }) => {
	const c = useStyles();
	return (
		<div className={c.container}>
			<Link component={RouterLink} to={to} children={text} />
		</div>
	);
};
