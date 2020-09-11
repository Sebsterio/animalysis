import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		height: "calc(100vh - 175px)", // Navbar + Toolbar + TablePagination
	},
	cell: {
		whiteSpace: "nowrap",
	},
	cellUnseen: {
		whiteSpace: "nowrap",
		fontWeight: "bold",
	},
});
