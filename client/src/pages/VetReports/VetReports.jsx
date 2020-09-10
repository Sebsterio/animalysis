import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	temp: {
		display: "flex",
		alignItems: "center",
	},
}));

export const VetReports = ({ reports, modifyReport }) => {
	const c = useStyles();

	return <div className={c.temp}>Work in progress...</div>;
};
