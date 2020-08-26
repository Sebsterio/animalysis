import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Section, Question, Nav, AlertModal } from "./components";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
}));

export const Survey = ({ surveyIsLoaded, history }) => {
	const c = useStyles();

	if (!surveyIsLoaded) {
		history.goBack();
		return null;
	}

	return (
		<Container maxWidth="xs" className={c.container}>
			<Section />
			<Question history={history} />
			<Nav history={history} />
			<AlertModal history={history} />
		</Container>
	);
};
