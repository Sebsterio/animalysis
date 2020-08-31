import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(6),
		paddingBottom: theme.spacing(4),
		display: "flex",
		flexFlow: "column nowrap",
		alignItems: "stretch",
		justifyContent: "space-between",
	},
	head: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	paper: {
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(6),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fixes IE 11 issue.
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));
