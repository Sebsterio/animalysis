import React from "react";
import { withError } from "HOC";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const PasswordInput = withError(({ label, isNew, error }) => {
	const isError = isNew
		? error.target === "newPassword"
		: error.target === "password";
	return (
		<Grid item xs={12}>
			<TextField
				variant="outlined"
				required={!isNew}
				fullWidth
				type="password"
				name={isNew ? "newPassword" : "password"}
				autoComplete={isNew ? undefined : "current-password"}
				label={isError ? error.msg : label || "Password"}
				error={isError}
			/>
		</Grid>
	);
});
