import React, { useState } from "react";
import { withError } from "HOC";
import { Button } from "@material-ui/core";

export const FileInput = withError(
	({
		name,
		onChange,
		required,
		className,
		variant,
		label,
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
					"https://api.cloudinary.com/v1_1/animalysis/image/upload/w_10, h_10/";
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

		return (
			<div {...{ className }}>
				<input
					{...{ id, name, onChange: uploadImage, required }}
					type="file"
					accept="image/*"
					hidden
				/>
				<label htmlFor={id}>
					<Button
						{...{ variant }}
						children={uploading ? "Uploading..." : label}
						component="span"
						className="fileUploadButton"
						fullWidth
					/>
				</label>
			</div>
		);
	}
);
