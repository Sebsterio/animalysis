import React from "react";
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
	const clx = useStyles();
	if (!question) return null;
	const { label, answers, type, setsTitle } = question;

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
						const handleChange = (e) =>
							handleAnswer({ answer: e.target.value, setsTitle }, history);
						return (
							<Box mb={2}>
								<TextField
									label="Problem description"
									variant="outlined"
									fullWidth
									multiline
									autoFocus
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
