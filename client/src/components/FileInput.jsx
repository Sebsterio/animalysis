import React, { useState } from "react";
import { withError } from "HOC";
import { Button } from "@material-ui/core";

// NOTE: `disabled` prop must be in both input and button
export const FileInput = withError(
	({
		name,
		onChange,
		required,
		className,
		variant,
		label,
		disabled,
		fullWidth,
		//withError
		setError,
	}) => {
		const [uploading, setUploading] = useState(false);

		const uploadImage = async (e) => {
			setUploading(true);
			try {
				const file = e.target.files[0];
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", "ml_default");
				const endpoint =
					"https://api.cloudinary.com/v1_1/animalysis/image/upload";
				const config = { method: "POST", body: data };
				const res = await fetch(endpoint, config);
				const resData = await res.json();
				const fileUrl = resData.secure_url; // can't be inline
				const newEvent = { target: { name, value: fileUrl, type: "file" } };
				onChange(newEvent);
			} catch ({ message }) {
				setError({ message, target: "generic", msg: "Error uploading file" });
			}
			setUploading(false);
		};

		const id = "form-input--" + name;

		const containerStyles = {};
		if (fullWidth) containerStyles.width = "100%";

		return (
			<div {...{ className }} style={containerStyles}>
				<input
					{...{ id, name, onChange: uploadImage, required, disabled }}
					type="file"
					accept="image/*"
					hidden
				/>
				<label htmlFor={id}>
					<Button
						{...{ variant, disabled }}
						children={uploading ? "Uploading..." : label}
						component="span"
						fullWidth
					/>
				</label>
			</div>
		);
	}
);
