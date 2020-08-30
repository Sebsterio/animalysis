import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	app: {
		position: "absolute",
		width: "100vw",
		height: "100vh",
		overflowX: "hidden",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "stretch",
		alignItems: "stretch",
	},
	header: {
		position: "relative",
		flex: "0 0 auto",
	},
	main: {
		position: "relative",
		flex: "1 1 0",
		width: "100vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "stretch",
	},
}));
