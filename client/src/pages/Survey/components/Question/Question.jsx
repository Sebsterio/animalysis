import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Button, Typography } from "@material-ui/core";

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
	handleAnswer,
}) => {
	const { route, label, type, answers } = question;

	const clx = useStyles();
	const id = label === "text" ? "Question" : null;

	return (
		<Box>
			<Box mb={3}>
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
				answers.map(({ text, selected, redirect }, i) => (
					<Box mb={2} key={`${route}-${i}`}>
						<Button
							fullWidth
							variant="outlined"
							color={selected ? "primary" : "default"}
							children={text}
							className={clx.button}
							onClick={() => handleAnswer(i, selected, redirect)}
						/>
					</Box>
				))}
		</Box>
	);
};

export default Question;
