import React from "react";
import "./AnswerButton.scss";

export const AnswerButton = ({ data, i, handler }) => {
	const { text, selected } = data;

	let classes = "AnswerButton";
	if (selected) classes += " AnswerButton--selected";

	return (
		<button className={classes} onClick={() => handler(i)}>
			{text}
		</button>
	);
};
