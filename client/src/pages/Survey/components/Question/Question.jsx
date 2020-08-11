import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import shortid from "shortid";

import { Box, Button, Typography } from "@material-ui/core";

// ---------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	question: {
		display: "block",
	},
}));

const Question = ({
	// parent
	history, // browser history
	// store
	question,
	questionIndex,
	lastQuestionIndex,
	isAnswerSelected,
	// dispatch
	submitAnswer,
	addAnswer,
	removeAnswer,
	goForward,
}) => {
	const clx = useStyles();

	if (!question) return null;

	const { type, label, answers } = question;

	const handleAnswer = (data) => {
		const selected = isAnswerSelected(data.answerIndex);
		if (type === "select-one") {
			submitAnswer(data);
			goForward(history);
		} else if (type === "select-multiple") {
			if (!selected) addAnswer(data);
			else removeAnswer(data);
		}
	};

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
					htmlFor="Question"
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
						onClick={() => handleAnswer({ answerIndex: i, followUp, alert })}
					/>
				</Box>
			))}
		</Box>
	);
};

export default Question;
