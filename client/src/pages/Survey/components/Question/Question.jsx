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
	question,
	questionIndex,
	lastQuestionIndex,
	currentAnswer,
	submitAnswer,
}) => {
	const clx = useStyles();
	if (!question) return null;
	const { label, type, answers } = question;

	const isAnswerSelected = (i) => arrayify(currentAnswer).some((a) => a === i);

	const handleAnswer = (i, followUp, alert) => {
		submitAnswer({
			answer: type === "select-one" ? i : null,
			partialAnswer: type === "select-multiple" ? i : null,
			selected: isAnswerSelected(i),
			followUp,
			alert,
		});
	};

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
						variant="outlined"
						color="default"
						disabled={isAnswerSelected(i)}
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
