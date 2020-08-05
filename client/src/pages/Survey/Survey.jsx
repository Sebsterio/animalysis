import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Section, Question, Nav } from "./components";
import { Container } from "@material-ui/core";

import { surveyData } from "redux/survey/survey-data";

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
	initSurvey,
	setAnswer,
	toggleAnswer,
	addFollowUpToQueue,
	goForward,
	goBack,
	// router
	history,
}) => {
	useEffect(() => initSurvey(surveyData), [initSurvey]);

	const clx = useStyles();

	const handleAnswer = ({ answer, partialAnswer, followUp }) => {
		if (answer !== null) setAnswer(answer);
		if (partialAnswer !== null) toggleAnswer(partialAnswer);
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
