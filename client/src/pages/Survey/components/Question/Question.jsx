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
	handleAnswer,
}) => {
	const clx = useStyles();
	if (!question) return null;

	const { label, type, answers } = question;

	const id = label === "text" ? "Question" : null;

	const isAnswerSelected = (i) => arrayify(currentAnswer).some((a) => a === i);

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

			{type === "select-one" &&
				answers.map(({ text, followUp }, i) => (
					<Box mb={2} key={shortid.generate()}>
						<Button
							fullWidth
							variant="outlined"
							color="default"
							disabled={isAnswerSelected(i)}
							children={text}
							className={clx.button}
							onClick={() =>
								handleAnswer({
									answer: i,
									followUp,
									selected: isAnswerSelected(i),
								})
							}
						/>
					</Box>
				))}

			{/* --- TEMP --- */}
			{type === "select-multiple" &&
				answers.map(({ text, followUp }, i) => (
					<Box mb={2} key={shortid.generate()}>
						<Button
							fullWidth
							variant="outlined"
							color="default"
							disabled={isAnswerSelected(i)}
							children={text}
							className={clx.button}
							onClick={() =>
								handleAnswer({
									partialAnswer: i,
									followUp,
									selected: isAnswerSelected(i),
								})
							}
						/>
					</Box>
				))}
		</Box>
	);
};

export default Question;
