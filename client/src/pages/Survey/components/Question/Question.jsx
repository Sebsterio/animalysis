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
	const clx = useStyles();
	if (!question) return null;
	const { label, answers } = question;

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

			{answers.map(({ text, followUp, alert }, answerIndex) => {
				const isSelected = isAnswerSelected(answerIndex);
				const handleClick = () =>
					handleAnswer({ answerIndex, followUp, alert, isSelected }, history);
				return (
					<Box mb={2} key={shortid.generate()}>
						<Button
							fullWidth
							variant={isSelected ? "contained" : "outlined"}
							color="default"
							children={text}
							className={clx.button}
							onClick={handleClick}
						/>
					</Box>
				);
			})}
		</Box>
	);
};

export default Question;
