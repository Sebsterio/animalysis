import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Section, Question, Nav } from "./components";
import { Container } from "@material-ui/core";

/*************************************************
 * Initializes survey store
 * Manages survey location, history, and queue
 * Submits Question answers
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

	if (!surveyIsLoaded) return <div>No survey has been selected</div>;

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
