import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import shortid from "shortid";
import { Box, Button, Typography, TextField } from "@material-ui/core";

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
	answer,
	isAnswerSelected,
	// dispatch
	handleAnswer,
}) => {
	const { label, answers, type, setsTitle, lengthLimit } = question;

	const isAnswerTooLong = (text) => !!text && text.length > lengthLimit;

	const [answerTooLong, setAnswerTooLong] = useState(isAnswerTooLong(answer));

	const clx = useStyles();

	console.log(history);

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
					htmlFor="Survey__Question"
					children={label}
				/>
			</Box>

			{type === "text"
				? (() => {
						const handleChange = (e) => {
							const answer = e.target.value;
							const newTooLong = isAnswerTooLong(answer);
							if (answerTooLong !== newTooLong) setAnswerTooLong(newTooLong);
							if (!newTooLong) handleAnswer({ answer, setsTitle }, history);
						};
						return (
							<Box mb={2}>
								<TextField
									label={
										answerTooLong ? "Length limit reached" : "Short description"
									}
									variant="outlined"
									fullWidth
									multiline
									autoFocus
									error={answerTooLong}
									value={answer || ""}
									onChange={handleChange}
									id="Survey__Question"
								/>
							</Box>
						);
				  })()
				: // type: select-one | select-multiple
				  answers.map(({ text, followUp, alert }, answerIndex) => {
						const isSelected = isAnswerSelected(answerIndex);
						const handleClick = () =>
							handleAnswer(
								{ answerIndex, followUp, alert, isSelected },
								history
							);
						return (
							<Box mb={2} key={shortid.generate()}>
								<Button
									fullWidth
									variant={isSelected ? "contained" : "outlined"}
									color="default"
									children={text}
									onClick={handleClick}
								/>
							</Box>
						);
				  })}
		</Box>
	);
};

export default Question;
