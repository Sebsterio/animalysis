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
	setAnswer,
	addAnswer,
	addFollowUpToQueue,
	goForward,
	goBack,
	// router
	history,
}) => {
	// TODO: survey return a msg when no-data

	const clx = useStyles();

	const handleAnswer = ({ answer, partialAnswer, followUp }) => {
		if (answer !== null) setAnswer(answer);
		if (partialAnswer !== null) addAnswer(partialAnswer);
		if (followUp) addFollowUpToQueue(followUp);
		if (answer !== null) goForward(history);
	};

	if (!surveyIsLoaded) return null;
	return (
		<Container maxWidth="xs" className={clx.container}>
			<Section />
			<Question submitAnswer={handleAnswer} />
			<Nav
				canGoForward={questionIsAnswered}
				goBack={() => goBack(history)}
				goForward={() => goForward(history)}
			/>
		</Container>
	);
};
