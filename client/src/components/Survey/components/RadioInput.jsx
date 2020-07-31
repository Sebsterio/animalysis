import React from "react";

export const RadioInput = ({ data, i, handleInput }) => {
	const { text, selected } = data;

	const id = `RadioInput-${i}`;

	return (
		<div className="RadioInput">
			<input
				id={id}
				className="RadioInput__input"
				type="radio"
				checked={selected}
				name="RadioInput-group"
				onChange={() => handleInput(i)}
			/>
			<label htmlFor={id} className="RadioInput__label">
				{text}
			</label>
		</div>
	);
};
