import React from "react";
import { withError } from "HOC";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const EmailInput = withError(({ label, isNew, error }) => {
	const isError = isNew
		? error.target === "newEmail"
		: error.target === "email";
	return (
		<Grid item xs={12}>
			<TextField
				variant="outlined"
				required={!isNew}
				fullWidth
				type="email"
				name={isNew ? "newEmail" : "email"}
				autoComplete={isNew ? undefined : "email"}
				label={isError ? error.msg : label || "Email Address"}
				error={isError}
			/>
		</Grid>
	);
});
