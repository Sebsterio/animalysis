import React, { useState } from "react";
import { Button } from "@material-ui/core";

export const FileInput = ({
	name,
	onChange,
	required,
	className,
	variant,
	label,
}) => {
	const [uploading, setUploading] = useState(false);

	const uploadImage = async (e) => {
		e.persist();
		setUploading(true);
		const file = e.target.files[0];
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "ml_default");
		const endpoint = "https://api.cloudinary.com/v1_1/animalysis/image/upload";
		const config = { method: "POST", body: data };
		const res = await fetch(endpoint, config);
		const resData = await res.json();
		const fileUrl = resData.secure_url; // can't be inline
		const newEvent = { target: { name, value: fileUrl, type: "file" } };
		setUploading(false);
		onChange(newEvent);
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
};
