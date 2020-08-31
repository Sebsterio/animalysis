import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

/*************************************************
 * Container: assummed to be stretched by parent (x & y)
 * Page: Grows vertically to contain children, limited height
 * Header & footer: optional, non-scrollable
 * Main: Grows vertically to fill free space,
 *   overflow Y-scrollable
 *************************************************/

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	header: {},
	main: {
		flex: 1,
		overflowY: "auto",
		display: "grid",
		gridGap: theme.spacing(3),
		alignContent: "center",
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	footer: {},
}));

export const Page = ({ header, footer, main, children = main }) => {
	const c = useStyles();
	return (
		<Container maxWidth="xs" className={c.page}>
			{header && <div className={c.header}>{header}</div>}
			<div className={c.main}>{children}</div>
			{footer && <div className={c.footer}>{footer}</div>}
		</Container>
	);
};
