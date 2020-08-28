import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	page: {
		padding: theme.spacing(2),
		width: "100%",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
	},
	footer: {
		marginTop: theme.spacing(3),
	},

	// Popover

	popover: {
		padding: theme.spacing(2),
	},
	backdrop: {
		zIndex: theme.zIndex.accordion + 1,
	},

	// Queues

	accordion: {
		width: "100%",
	},
	accordionSummaryContent: {
		display: "flex",
		alignItems: "center",
	},
	accordionDetails: {
		padding: theme.spacing(0, 1),
		flexFlow: "column nowrap",
	},

	// Division

	division: {
		padding: theme.spacing(2, 1),
		margin: theme.spacing(1, 0),
	},
	divisionExpanded: {
		padding: theme.spacing(2, 1),
		margin: theme.spacing(1, 0),
		gridColumn: "1 / -1",
	},
	heading: {
		display: "block",
		width: "100%",
	},
	row: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	viewer: {
		display: "grid",
		gridGap: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			gridTemplateColumns: "1fr auto",
			alignContent: "center",
			alignItems: "center",
		},
	},
	form: {
		display: "grid",
		gridTemplateColumns: "auto 1fr",
		alignContent: "center",
		alignItems: "center",
		gridGap: theme.spacing(2),
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
		gridGap: theme.spacing(2),
	},

	// Instructions

	codeBlock: {
		display: "block",
		padding: theme.spacing(1),
		backgroundColor: "#eee",
		borderRadius: 4,
	},

	// Helpers

	mTop2: {
		marginTop: theme.spacing(2),
	},
	mTop1: {
		marginTop: theme.spacing(1),
	},
	mTop0: {
		marginTop: 0,
	},
	mBottom2: {
		marginBottom: theme.spacing(2),
	},
	bold: {
		fontWeight: "bold",
	},
}));
