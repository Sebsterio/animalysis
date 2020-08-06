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
	submitAnswer,
	addAnswer,
	removeAnswer,
}) => {
	const { label, type, answers } = question;

	const clx = useStyles();

	const isAnswerSelected = (i) => arrayify(currentAnswer).some((a) => a === i);

	const handleAnswer = (i, followUp, alert) => {
		const selected = isAnswerSelected(i);
		const args = { answerIndex: i, followUp, alert };

		if (type === "select-one") {
			submitAnswer(args);
			goForward();
		} else if (type === "select-multiple") {
			if (!selected) addAnswer(args);
			else removeAnswer(args);
		}
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
