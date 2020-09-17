import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	container: {
		height: "calc(100vh - 180px)", // Navbar + Toolbar + TablePagination
		[theme.breakpoints.up("sm")]: {
			height: "calc(100vh - 130px)", // Navbar + Footer
		},
	},
	cell: {
		whiteSpace: "nowrap",
	},
	cellUnseen: {
		whiteSpace: "nowrap",
		fontWeight: "bold",
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
}));
