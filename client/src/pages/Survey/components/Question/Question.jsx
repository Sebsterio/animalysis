import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import shortid from "shortid";

import { Box, Button, Typography } from "@material-ui/core";

import { arrayify } from "utils/array";

// ---------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	question: {
		display: "block",
	},
}));

const Question = ({
	// parent
	goForward,
	// store
	question,
	questionIndex,
	lastQuestionIndex,
	currentAnswer,
	// dispatch
	setAnswer,
	addAnswer,
	addFollowUpToQueue,
}) => {
	const { label, type, answers } = question;

	const clx = useStyles();

	const isAnswerSelected = (i) => arrayify(currentAnswer).some((a) => a === i);

	// Set answer if different tha current and go forward
	const submitAnswer = (i, followUp, alert) => {
		if (!isAnswerSelected(i)) {
			setAnswer(i);
			if (followUp) addFollowUpToQueue({ followUp });
		}
		goForward();
	};

	// Add/remove answer
	const editAnswer = (i, followUp, alert) => {
		if (!isAnswerSelected(i)) {
			addAnswer(i);
			if (followUp) addFollowUpToQueue({ followUp, answerIndex: i });
		} else {
			// removeAnswer(i);
			// if (followUp) removeFollowUpFromQueue(followUp);
		}
	};

	const handleAnswer = (i, followUp, alert) => {
		if (type === "select-one") submitAnswer(i, followUp, alert);
		else if (type === "select-multiple") editAnswer(i, followUp, alert);
	};

	// -------------------------------- View ---------------------------------

	if (!question) return null;

	const id = label === "text" ? "Question" : null;

	return (
		<Box>
			<Box mb={2}>
				<Typography
					variant="caption"
					children={`Question ${questionIndex + 1}/${lastQuestionIndex + 1}`}
				/>
			</Box>

			<Box mb={4}>
				<Typography
					component="label"
					variant="h5"
					className={clx.question}
					htmlFor={id}
					children={label}
				/>
			</Box>

			{answers.map(({ text, followUp, alert }, i) => (
				<Box mb={2} key={shortid.generate()}>
					<Button
						fullWidth
						variant={isAnswerSelected(i) ? "contained" : "outlined"}
						color="default"
						children={text}
						className={clx.button}
						onClick={() => handleAnswer(i, followUp, alert)}
					/>
				</Box>
			))}
		</Box>
	);
};

export default Question;
