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
	handleAnswer,
}) => {
	const { label, answers } = question;

	const clx = useStyles();

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
						onClick={() =>
							handleAnswer({
								data: { answerIndex: i, followUp, alert },
								history,
							})
						}
					/>
				</Box>
			))}
		</Box>
	);
};

export default Question;
