import React from "react";
import { AnswerButton, TextInput } from "../index";
import "./Question.scss";

const Question = ({
	question,
	questionIndex,
	lastQuestionIndex,
	handleAnswer,
}) => {
	const { route, label, type, answers } = question;

	const id = "Question";

	return (
		<div className="Question">
			<div className="Question__info">
				Question {questionIndex + 1}/{lastQuestionIndex + 1}
			</div>

			<label htmlFor={id} className="Question__text">
				{label}
			</label>

			{type === "select-one" && (
				<div className="Question__answers" id={id}>
					{answers.map((answer, i) => (
						<AnswerButton
							key={`${route}-${i}`}
							i={i}
							data={answer}
							handler={handleAnswer}
						/>
					))}
				</div>
			)}
			{type === "text" && <TextInput id={id} />}
		</div>
	);
};

export default Question;
