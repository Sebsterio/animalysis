import React from "react";
import { Button } from "@material-ui/core";

export const FileInput = ({
	name,
	onChange,
	required,
	className,
	variant,
	label,
}) => {
	const id = "form-input--" + name;
	return (
		<div {...{ className }}>
			<input
				{...{ id, name, onChange, required }}
				type="file"
				accept="image/*"
				hidden
			/>
			<label htmlFor={id}>
				<Button
					{...{ variant }}
					children={label}
					component="span"
					className="fileUploadButton"
					fullWidth
				/>
			</label>
		</div>
	);
};
