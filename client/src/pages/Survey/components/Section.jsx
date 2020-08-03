import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		textAlign: "center",
		paddingTop: "1em",
		fontSize: "1.3em",
	},
}));

export const Section = ({ section }) => {
	return <div className={useStyles().container}>Section: {section.title}</div>;
};
