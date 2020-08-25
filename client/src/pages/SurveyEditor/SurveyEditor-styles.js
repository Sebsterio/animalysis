import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	page: {
		padding: theme.spacing(2),
		width: "100%",
	},
	accordion: {
		width: "100%",
	},
	accordionSummaryContent: {
		display: "flex",
		alignItems: "center",
		margin: theme.spacing(1, 0) + " !important",
	},
	accordionDetails: {
		flexFlow: "column nowrap",
	},
	popover: {
		padding: theme.spacing(2),
	},
	backdrop: {
		zIndex: theme.zIndex.accordion + 1,
	},
	col: {
		width: "100%",
	},
	heading: {
		marginBottom: theme.spacing(2),
	},
	group: {
		margin: theme.spacing(2, 0),
	},
	row: {
		marginTop: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
	},
	// question
	innerPaper: {
		padding: theme.spacing(2),
		margin: theme.spacing(1, 0),
	},
	form: {
		display: "grid",
		gridTemplateColumns: "auto 1fr",
		alignContent: "center",
		alignItems: "center",
		gridGap: theme.spacing(2),
	},
}));
