import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Button, Typography, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { usePopover } from "hooks";
import shortid from "shortid";

// ---------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	question: { display: "block" },
	infoContainer: { textAlign: "center" },
	card: { width: 260 },
	media: {
		height: 0,
		paddingTop: "100%", // 16:9
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
	const { imageUrl, description } = question;

	const isAnswerTooLong = (text) =>
		!!text && text.length > lengthLimit && lengthLimit > 0;

	const [answerTooLong, setAnswerTooLong] = useState(isAnswerTooLong(answer));

	// Popover
	const [{ isOpen, anchorEl }, { showPopover, hidePopover }] = usePopover();

	const c = useStyles();

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
					className={c.question}
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

			{(!!imageUrl || !!description) && (
				<div className={c.infoContainer}>
					<IconButton children={<InfoOutlinedIcon />} onClick={showPopover} />
				</div>
			)}

			{/* ------------ Popover ------------ */}

			<Backdrop open={isOpen} onClick={hidePopover} invisible>
				<Popover
					id="Question__popover"
					open={isOpen}
					anchorEl={anchorEl}
					onClose={hidePopover}
					anchorOrigin={{ vertical: "center", horizontal: "center" }}
					transformOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					<Card className={c.card}>
						<CardActionArea>
							{!!imageUrl && (
								<CardMedia
									className={c.media}
									image={imageUrl}
									title="Helper image"
								/>
							)}
							{description && (
								<CardContent>
									<Typography align="center" children={description} />
								</CardContent>
							)}
						</CardActionArea>
					</Card>
				</Popover>
			</Backdrop>
		</Box>
	);
};

export default Question;
