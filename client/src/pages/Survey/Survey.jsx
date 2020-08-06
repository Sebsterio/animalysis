import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Section, Question, Nav } from "./components";
import { Container } from "@material-ui/core";

/*************************************************
 * Redirects if survey data not loaded (URL accessed manually when no survey is active)
 * Container for other connected components
 * Handles survey traversal (back and next)
 *************************************************/

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
}));

export const Survey = ({
	// state
	surveyIsLoaded,
	questionIsAnswered,
	// dispatch
	goForward,
	goBack,
	// router
	history,
}) => {
	const clx = useStyles();

	if (!surveyIsLoaded) return <Redirect to="/" />;

	return (
		<Container maxWidth="xs" className={clx.container}>
			<Section />
			<Question goForward={() => goForward(history)} />
			<Nav
				canGoForward={questionIsAnswered}
				goBack={() => goBack(history)}
				goForward={() => goForward(history)}
			/>
		</Container>
	);
};
