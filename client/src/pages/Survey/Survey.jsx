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
	addAnswer,
	addFollowUpToQueue,
	goForward,
	goBack,
	// router
	history,
}) => {
	useEffect(() => initSurvey(surveyData), [initSurvey]);

	const clx = useStyles();

	const handleAnswer = ({ answer, followUp }) => {
		addAnswer(answer);
		if (followUp) addFollowUpToQueue(followUp);
		goForward(history);
	};

	if (!surveyIsLoaded) return null;
	return (
		<Container maxWidth="xs" className={clx.container}>
			<Section />
			<Question handleAnswer={handleAnswer} />
			<Nav
				canGoForward={questionIsAnswered}
				goBack={() => goBack(history)}
				goForward={() => goForward(history)}
			/>
		</Container>
	);
};
