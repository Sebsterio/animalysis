import React from "react";

export const RadioInput = ({ text, i, handleInput }) => {
	const id = `RadioInput-${i}`;

	return (
		<div className="RadioInput">
			<input
				id={id}
				className="RadioInput__input"
				type="radio"
				name="RadioInput-group"
				onInput={handleInput}
			/>
			<label htmlFor={id} className="RadioInput__label">
				{text}
			</label>
		</div>
	);
};
