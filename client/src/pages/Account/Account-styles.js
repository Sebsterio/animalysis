import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	head: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: theme.spacing(2),
	},
	main: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fixes IE 11 issue.
	},
	submit: { margin: theme.spacing(3, 0, 2) },

	// Logo
	logoContainer: {
		display: "block",
		width: 200,
		height: "auto",
		objectFit: "contain",
	},
	logo: { width: "100%" },

	// Other
	link2: { marginTop: theme.spacing(1) },
}));
