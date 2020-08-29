import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	container: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		display: "inline-block",
		width: 50,
		height: 50,
		border: "3px solid rgba(195, 195, 195, 0.6)",
		borderRadius: "50%",
		borderTopColor: "#636767",
		animation: "$spin 1s infinite ease-in-out",
		WebkitAnimation: "$spin 1s infinite ease-in-out",
	},
	"@keyframes spin": {
		to: {
			transform: "rotate(360deg)",
		},
	},
	"@-webkit-keyframes spin": {
		to: {
			WebkitTransform: "rotate(360deg)",
		},
	},
}));

export const Spinner = () => {
	const c = useStyles();
	return (
		<div className={c.container}>
			<div className={c.content}></div>
		</div>
	);
};
