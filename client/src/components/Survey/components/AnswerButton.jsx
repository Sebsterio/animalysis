import React from "react";
import "./AnswerButton.scss";

export const AnswerButton = ({ data, i, handler }) => {
	const { text, selected, redirect } = data;

	let classes = "AnswerButton";
	if (selected) classes += " AnswerButton--selected";

	return (
		<button className={classes} onClick={() => handler(i, selected, redirect)}>
			{text}
		</button>
	);
};
