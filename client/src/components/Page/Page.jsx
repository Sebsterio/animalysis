import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

/*************************************************
 * Grows vertically to contain children, limited height
 * Header & footer: optional, non-scrollable
 * Content container: Grows vertically to fill free space,
 *   overflow Y-scrollable
 *************************************************/

const useStyles = makeStyles((theme) => ({
	page: {
		maxHeight: "90vh",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	header: {
		marginBottom: theme.spacing(4),
	},
	main: {
		overflowY: "auto",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
	},
	footer: {
		marginTop: theme.spacing(4),
	},
}));

export const Page = ({ header, footer, main, children = main }) => {
	const clx = useStyles();
	return (
		<Container maxWidth="xs" className={clx.page}>
			{header && <div className={clx.header}>{header}</div>}
			<div className={clx.main}>{children}</div>
			{footer && <div className={clx.footer}>{footer}</div>}
		</Container>
	);
};
