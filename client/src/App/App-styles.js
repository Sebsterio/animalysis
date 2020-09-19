import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	app: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100vw",
		// height: "100vh", // fallback
		height: ({ viewportHeight }) => viewportHeight || "100vh",
		overflow: "hidden",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "stretch",
		alignItems: "stretch",
	},
	item: {
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
		overflowY: "auto",
	},
}));
