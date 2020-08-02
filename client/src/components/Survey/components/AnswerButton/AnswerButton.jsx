import React from "react";
import "./AnswerButton.scss";

export const AnswerButton = ({ data, i, handler }) => {
	const { text, selected, redirect } = data;

	let classes = "AnswerButton";
	if (selected) classes += " AnswerButton--selected";

	const handleClick = () => handler(i, selected, redirect);

	return (
		<button className={classes} onClick={handleClick}>
			{text}
		</button>
	);
};
