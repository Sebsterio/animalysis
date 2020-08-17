import React from "react";
import { TextField } from "@material-ui/core";

export const Form = ({ fields, state, handleChange }) => {
	return (
		<div>
			{fields.map(
				({ type, name, label }) =>
					type === "text" && (
						<TextField
							key={name}
							label={label}
							name={name}
							variant="outlined"
							value={state[name] || ""}
							onChange={handleChange}
						/>
					)
			)}
		</div>
	);
};
