import React from "react";
import { RadioInput, TextInput } from "./index";
import "./Question.scss";

export const Question = ({ data, handleInput }) => {
	const { route, label, type, answers } = data;

	const id = "Question";

	return (
		<div className="Question">
			<label htmlFor={id} className="Question__text">
				{label}
			</label>

			{type === "radio" &&
				answers.map((a, i) => (
					<RadioInput
						key={`${route}-${i}`}
						i={i}
						data={a}
						handleInput={handleInput}
					/>
				))}

			{type === "text" && <TextInput id={id} />}
		</div>
	);
};
