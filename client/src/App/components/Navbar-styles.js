import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	// Bar
	toolbar: {
		width: "100%",
		maxWidth: theme.breakpoints.values.sm,
		margin: "auto",
	},
	appLogo: {
		textDecoration: "none",
		color: "white",
		lineHeight: 0,
	},
	title: { flexGrow: 1 },

	// Menu
	drawerPaper: {
		width: "100vw",
		[theme.breakpoints.up("sm")]: {
			width: "auto",
			padding: theme.spacing(0, 6),
		},
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		alignItems: "stretch",
	},
	closeMenuButton: {
		position: "absolute",
		top: 0,
		right: theme.spacing(2),
		zIndex: 999,
	},
	navLink: {
		textAlign: "center",
	},
	navLinkActive: {
		color: theme.palette.primary.main,
	},
}));
