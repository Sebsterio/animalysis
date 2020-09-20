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

const useStyles = makeStyles((theme) => {
	const main = {
		flex: 1,
		display: "grid",
		gridGap: theme.spacing(3),
		alignContent: "center",
	};
	return {
		page: {
			display: "flex",
			flexFlow: "column nowrap",
			justifyContent: "space-between",
			// browser bug fix
			padding: theme.spacing(3, 3, 0, 3),
			"& > *:last-child": { marginBottom: theme.spacing(3) },
		},
		main: {
			...main,
			paddingTop: theme.spacing(4),
		},
		main2: {
			...main,
			paddingBottom: theme.spacing(4),
		},
		spacer: {
			height: theme.spacing(4),
			flex: "0 0 auto",
		},
	};
});

export const Page = ({
	header,
	footer,
	main,
	children = main,
	main2,
	headerClass,
	footerClass,
	maxWidth = "xs",
}) => {
	const c = useStyles();
	return (
		<Container maxWidth={maxWidth} className={c.page}>
			{header && <div className={headerClass}>{header}</div>}

			{main && <div className={c.main}>{children}</div>}
			<div className={c.spacer} />
			{main2 && <div className={c.main2}>{main2}</div>}

			{footer && <div className={footerClass}>{footer}</div>}
		</Container>
	);
};
